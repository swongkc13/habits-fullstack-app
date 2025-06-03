pipeline {
    agent any

    tools {
        maven 'Maven_3'
        jdk 'Java_17'
        nodejs 'Node_20'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/your-username/your-mono-repo'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'mvn clean package' // use `sh` on Linux
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

        stage('Archive Backend JAR') {
            steps {
                dir('backend') {
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }

        stage('Archive Frontend Build') {
            steps {
                dir('frontend') {
                    archiveArtifacts artifacts: 'dist/**', fingerprint: true
                }
            }
        }
    }
}
