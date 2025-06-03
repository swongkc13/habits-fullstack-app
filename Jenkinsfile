pipeline {
    agent any

    tools {
        maven 'Maven 3'
        jdk 'Java_17'
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
                script {
                    def nodeHome = tool name: 'Node_20', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    withEnv(["PATH=${nodeHome}/bin:${env.PATH}"]) {
                        dir("${FRONTEND_DIR}") {
                            bat 'npm install'
                            bat 'npm run build'
                        }
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
