# Plan: IaC/DevOps - Deploy with AWS CDK

## Objective
Deploy the compiled React application to AWS using AWS CDK. The infrastructure will consist of a private S3 bucket and a CloudFront distribution with Origin Access Control (OAC).

## Steps
- [ ] **Step 1: Initialize CDK Project**
  - Create a new directory named `cdk-infra` alongside the `job-app` folder.
  - Initialize a new AWS CDK TypeScript project.
- [ ] **Step 2: Define Infrastructure (IaC)**
  - Create a private S3 Bucket with a random prefix.
  - Create a CloudFront Distribution pointing to the S3 bucket using OAC.
  - Ensure the bucket policy strictly allows CloudFront access to `arn:aws:s3:::bucket/*`.
  - Add `CfnOutput` values for the Bucket Name and CloudFront Domain Name.
- [ ] **Step 3: Deploy Infrastructure**
  - Run `cdk synth` to validate and `cdk deploy` to provision.
- [ ] **Step 4: Deploy React App Assets**
  - Execute `aws s3 sync ../job-app/dist s3://<BUCKET_NAME>` to push the static files.