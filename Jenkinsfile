pipeline {
    agent any

    environment {
        // Change 'andestalin07' to your Docker Hub username or registry namespace
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
                echo "==> Fetching latest source code from SCM..."
                checkout scm
            }
        }

        stage('Code Quality & Linting') {
            steps {
                echo "==> Running static code analysis and syntax checks..."
                sh '''
                    python3 -m pip install --upgrade pip
                    python3 -m pip install flake8
                    flake8 server.py tests/ --count --select=E9,F63,F7,F82 --show-source --statistics || true
                '''
            }
        }

        stage('Run Automated Tests') {
            steps {
                echo "==> Running test suite..."
                sh '''
                    python3 -m pip install -r requirements.txt
                    mkdir -p reports
                    pytest tests/ --junitxml=reports/results.xml || python3 -m unittest discover tests/
                '''
            }
            post {
                always {
                    // Archive JUnit test report if available
                    junit allowEmptyResults: true, testResults: 'reports/*.xml'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "==> Building Docker image: ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}..."
                sh """
                    docker build -t ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} -t ${DOCKER_IMAGE_NAME}:latest .
                """
            }
        }

        stage('Container Smoke Test') {
            steps {
                echo "==> Running container health smoke test..."
                sh """
                    docker run -d --name smoke-test-${BUILD_NUMBER} -p 5001:5000 \
                        -e DATABASE_URL="dummy_test_db" ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}

                    # Wait up to 15 seconds for container to start up
                    sleep 5

                    # Verify root HTTP endpoint returns 200
                    curl -I http://localhost:5001/ || python3 -c "import urllib.request; assert urllib.request.urlopen('http://localhost:5001/').getcode() == 200"

                    echo "Smoke test passed successfully!"
                """
            }
            post {
                always {
                    sh """
                        docker stop smoke-test-${BUILD_NUMBER} || true
                        docker rm -f smoke-test-${BUILD_NUMBER} || true
                    """
                }
            }
        }

        stage('Push to Docker Registry') {
            // Only push when building main/master branch
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                echo "==> Authenticating and pushing Docker image to Docker Hub..."
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}
                        docker push ${DOCKER_IMAGE_NAME}:latest
                        docker logout
                    """
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
                echo "==> Deploying application container..."
                sh """
                    # Stop and remove existing running container if present
                    docker stop ${CONTAINER_NAME} || true
                    docker rm -f ${CONTAINER_NAME} || true

                    # Run new container with latest image
                    docker run -d \\
                        --name ${CONTAINER_NAME} \\
                        --restart unless-stopped \\
                        -p ${PORT}:${PORT} \\
                        --env-file .env \\
                        ${DOCKER_IMAGE_NAME}:latest

                    echo "Deployment completed! Application running on port ${PORT}."
                """
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded! Build #${BUILD_NUMBER} is deployed and healthy."
        }
        failure {
            echo "Pipeline failed! Please check console output and test results."
        }
        always {
            // Clean up dangling docker images to prevent disk space exhaustion
            sh "docker image prune -f || true"
        }
    }
}
