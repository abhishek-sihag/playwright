pipeline {
    agent any

    stages {

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests APIs') {
            steps {
                bat 'npx playwright test --project=API'
            }
        }

        stage('Run Tests UI') {
            steps {
                bat 'npx playwright test --project=UI'
            }
        }
    }
}