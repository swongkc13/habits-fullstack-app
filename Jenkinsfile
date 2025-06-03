pipeline {
    agent any

    tools {
        maven 'Maven 3'
        jdk 'Java_17'
        nodejs 'Node_20'
    }

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'mvn clean install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    bat 'mvn test'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                dir('backend') {
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
                dir('frontend/dist') {
                    archiveArtifacts artifacts: '**/*', fingerprint: true
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build and tests passed!'
        }
        failure {
            echo '❌ Build failed.'
        }
    }
}
