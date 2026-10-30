pipeline {
    agent any
    
    stages {
        stage('Checkout Code') {
            steps {
                // Pulls code from your SCM repository (e.g., GitHub)
                checkout scm
            }
        }
        
        stage('Deploy to Minikube Server') {
            steps {
                // Uses the Publish Over SSH plugin connection we configured
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'minikube-app-server',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'deployment.yaml, service.yaml, server.js, Dockerfile, package.json',
                                    removePrefix: '',
                                    remoteDirectory: 'sports-week-app',
                                    execCommand: '''
                                        cd /home/ubuntu/sports-week-app
                                        
                                        # Optional: Build the Docker image inside Minikube's environment if needed
                                        # eval $(minikube docker-env)
                                        # docker build -t sports-week-app:latest .
                                        
                                        # Apply Kubernetes manifests
                                        echo "Applying Kubernetes deployments and services..."
                                        kubectl apply -f deployment.yaml
                                        kubectl apply -f service.yaml
                                        
                                        echo "Deployment completed successfully!"
                                    ''',
                                    execTimeout: 120000
                                )
                            ],
                            usePromotionTimestamp: false,
                            useSafePublishers: false
                        )
                    ]
                )
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully! Your app has been pushed to Minikube.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}