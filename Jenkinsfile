pipeline {
    agent any

    tools {
        maven 'Maven 3'        // Make sure name matches Jenkins config
        jdk 'Java_17'          // Make sure name matches Jenkins config
    }

    environment {
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
    }

    stages {
        stage('Build Backend') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    bat 'mvn clean install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    bat 'mvn test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    // Use NodeJS plugin wrapper
                    withNodejs('Node_20') {
                        bat 'npm install'
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: "${env.BACKEND_DIR}/target/*.jar", fingerprint: true
                archiveArtifacts artifacts: "${env.FRONTEND_DIR}/dist/**", fingerprint: true
            }
        }
    }
}
