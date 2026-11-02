pipeline {
    agent any

    environment {
        APP_NAME  = "nodejs-app"
        BUILD_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('1. Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('2. Build Docker Image') {
            steps {
                sh "docker build -t ${APP_NAME}:${BUILD_TAG} ."
                sh "docker tag ${APP_NAME}:${BUILD_TAG} ${APP_NAME}:latest"
            }
        }

        stage('3. Load Image to Minikube') {
            steps {
                sh "minikube image load ${APP_NAME}:${BUILD_TAG}"
            }
        }

        stage('4. Deploy to Kubernetes') {
            steps {
                sh "kubectl apply -f k8s/deployment.yaml"
                sh "kubectl set image deployment/nodejs-deployment nodejs-container=${APP_NAME}:${BUILD_TAG}"
            }
        }

        stage('5. Verify Rollout') {
            steps {
                sh "kubectl rollout status deployment/nodejs-deployment --timeout=60s"
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded! Node.js app deployed with build #${BUILD_NUMBER}."
        }
        failure {
            echo "Pipeline failed! Check logs above."
        }
    }
}
