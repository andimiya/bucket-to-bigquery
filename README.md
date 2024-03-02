## Basic setup to run and deploy a Google Cloud Function locally

Run through these environment setup steps first: https://cloud.google.com/nodejs/docs/setup

- Create a GCP Project
- Authenticate your CLI with your GCP Project: gcloud auth application-default login
- Clone this template
- Update your bucket name in `deploy.sh`
  - When a file is put in this bucket, your GCP function will be triggered
- Update your function name in `deploy.sh`
  - This will be the name of your function when you view it in the GCP console
- Run npm install
- Run npm start for local development
- Run npm deploy to deploy your function to GCP
- After a successful deploy, the hosted endpoint will appear in your CLI
