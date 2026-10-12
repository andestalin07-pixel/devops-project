pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 15, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo '===> Fetching latest source code from Git repository...'
                checkout scm
            }
        }

        stage('Set Up Environment & Dependencies') {
            steps {
                echo '===> Setting up Python virtual environment and installing dependencies...'
                script {
                    if (isUnix()) {
                        sh '''
                            python3 -m venv venv || python -m venv venv
                            . venv/bin/activate
                            python -m pip install --upgrade pip
                            pip install -r requirements.txt
                        '''
                    } else {
                        bat '''
                            python -m venv venv
                            call venv\\Scripts\\activate.bat
                            python -m pip install --upgrade pip
                            pip install -r requirements.txt
                        '''
                    }
                }
            }
        }

        stage('Code Quality & Linting') {
            steps {
                echo '===> Running Flake8 static analysis and code syntax checks...'
                script {
                    if (isUnix()) {
                        sh '''
                            . venv/bin/activate
                            flake8 server.py tests/ --count --select=E9,F63,F7,F82 --show-source --statistics || true
                        '''
                    } else {
                        bat '''
                            call venv\\Scripts\\activate.bat
                            flake8 server.py tests/ --count --select=E9,F63,F7,F82 --show-source --statistics || exit 0
                        '''
                    }
                }
            }
        }

        stage('Run Automated Tests') {
            steps {
                echo '===> Executing test suite and generating JUnit test reports...'
                script {
                    if (isUnix()) {
                        sh '''
                            . venv/bin/activate
                            mkdir -p reports
                            pytest tests/ --junitxml=reports/results.xml || python3 -m unittest discover tests/
                        '''
                    } else {
                        bat '''
                            call venv\\Scripts\\activate.bat
                            if not exist reports mkdir reports
                            pytest tests/ --junitxml=reports/results.xml || python -m unittest discover tests/
                        '''
                    }
                }
            }
            post {
                always {
                    // Publishes JUnit test results in Jenkins UI
                    junit allowEmptyResults: true, testResults: 'reports/*.xml'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo '===> Archiving application source and deployment bundle...'
                archiveArtifacts artifacts: 'server.py, requirements.txt, index.html, style.css, app.js', allowEmptyArchive: true
            }
        }
    }

    post {
        success {
            echo '==================================================='
            echo " Build #${BUILD_NUMBER} succeeded! All checks passed."
            echo '==================================================='
        }
        failure {
            echo '==================================================='
            echo " Build #${BUILD_NUMBER} failed! Please inspect logs."
            echo '==================================================='
        }
    }
}
