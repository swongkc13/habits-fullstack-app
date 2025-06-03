pipeline {
    agent any

    tools {
        maven 'Maven 3'      // Match the name in Global Tool Configuration
        jdk 'Java 17'        // Match your installed JDK name
    }

    environment {
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
    }

    stages {
        stage('Build Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'mvn test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    withNodejs('Node_20') {
                        bat 'npm install'
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: "${BACKEND_DIR}/target/*.jar", fingerprint: true
                archiveArtifacts artifacts: "${FRONTEND_DIR}/dist/**", fingerprint: true
            }
        }
    }
}
