pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME      = 'andestalin07/nugget-app'
        DOCKER_HUB_CREDENTIALS = 'dockerhub-credentials'
        CONTAINER_NAME         = 'nugget-service'
        PORT                   = '5000'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 20, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo '==> Fetching latest source code from SCM...'
                checkout scm
            }
        }

        stage('Code Quality & Linting') {
            steps {
                echo '==> Running static code analysis and syntax checks...'
                bat '''
                    python -m pip install --upgrade pip
                    if errorlevel 1 exit /b 1

                    python -m pip install flake8
                    if errorlevel 1 exit /b 1

                    python -m flake8 server.py tests/ --count --select=E9,F63,F7,F82 --show-source --statistics
                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Run Automated Tests') {
            steps {
                echo '==> Running test suite...'
                bat '''
                    python -m pip install -r requirements.txt
                    if errorlevel 1 exit /b 1

                    if not exist reports mkdir reports

                    python -m pytest tests/ --junitxml=reports/results.xml
                    if errorlevel 1 (
                        python -m unittest discover -s tests
                        if errorlevel 1 exit /b 1
                    )
                '''
            }
            post {
                always {
                    junit allowEmptyResults: true,
                          testResults: 'reports/*.xml'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "==> Building Docker image: ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}..."
                bat '''
                    docker build -t %DOCKER_IMAGE_NAME%:%BUILD_NUMBER% -t %DOCKER_IMAGE_NAME%:latest .
                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Container Smoke Test') {
            steps {
                echo '==> Running container health smoke test...'
                bat '''
                    docker run -d --name smoke-test-%BUILD_NUMBER% -p 5001:5000 -e DATABASE_URL=dummy_test_db %DOCKER_IMAGE_NAME%:%BUILD_NUMBER%
                    if errorlevel 1 exit /b 1

                    timeout /t 5 /nobreak > nul

                    python -c "import urllib.request; r=urllib.request.urlopen('http://localhost:5001/', timeout=10); assert r.status == 200"
                    if errorlevel 1 exit /b 1

                    echo Smoke test passed successfully!
                '''
            }
            post {
                always {
                    bat '''
                        docker stop smoke-test-%BUILD_NUMBER% 2>nul
                        docker rm -f smoke-test-%BUILD_NUMBER% 2>nul
                        exit /b 0
                    '''
                }
            }
        }

        stage('Push to Docker Registry') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                echo '==> Authenticating and pushing image to Docker Hub...'
                withCredentials([
                    usernamePassword(
                        credentialsId: "${DOCKER_HUB_CREDENTIALS}",
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    bat '''
                        @echo off
                        docker login -u "%DOCKER_USER%" --password-stdin < nul
                    '''
                    script {
                        // Use PowerShell to pass the password securely through stdin.
                        withEnv(["REGISTRY_USER=${env.DOCKER_USER ?: ''}"]) {
                            powershell '''
                                $ErrorActionPreference = 'Stop'
                                $password = $env:DOCKER_PASS
                                if ([string]::IsNullOrWhiteSpace($password)) {
                                    throw "Docker Hub password is missing."
                                }
                                $password | docker login -u $env:DOCKER_USER --password-stdin
                                if ($LASTEXITCODE -ne 0) { throw "Docker login failed." }
                                docker push "$env:DOCKER_IMAGE_NAME`:$env:BUILD_NUMBER"
                                if ($LASTEXITCODE -ne 0) { throw "Docker image push failed." }
                                docker push "$env:DOCKER_IMAGE_NAME`:latest"
                                if ($LASTEXITCODE -ne 0) { throw "Latest image push failed." }
                                docker logout
                            '''
                        }
                    }
                }
            }
        }

        stage('Deploy (Continuous Deployment)') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                echo '==> Deploying application container...'
                bat '''
                    docker stop %CONTAINER_NAME% 2>nul
                    docker rm -f %CONTAINER_NAME% 2>nul

                    docker run -d ^
                        --name %CONTAINER_NAME% ^
                        --restart unless-stopped ^
                        -p %PORT%:%PORT% ^
                        --env-file .env ^
                        %DOCKER_IMAGE_NAME%:latest

                    if errorlevel 1 exit /b 1

                    echo Deployment completed!
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded! Build #${BUILD_NUMBER} completed successfully."
        }
        failure {
            echo 'Pipeline failed! Check the console output and test results.'
        }
        always {
            bat '''
                docker image prune -f
                exit /b 0
            '''
        }
    }
}
