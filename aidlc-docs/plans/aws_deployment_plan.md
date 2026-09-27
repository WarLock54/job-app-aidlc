# Plan: IaC/DevOps - Deploy with AWS CDK

> **Status: NOT CANONICAL / NOT IMPLEMENTED.** AWS'e geçilecekse aşağıdaki "Production Hardening Checklist" P0 maddeleri tamamlanmadan `cdk deploy` çalıştırılmamalıdır.

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

## Production Hardening Checklist (P0/P1/P2)

**P0 — bloklayıcı, tamamlanmadan `cdk deploy` yapılmamalı**
- [ ] S3 bucket `RemovalPolicy: RETAIN` açıkça ayarlanmalı (varsayılan `DESTROY` prod veriyi silebilir).
- [ ] S3 `blockPublicAccess: BLOCK_ALL` + SSE-S3/KMS encryption; erişim sadece OAC üzerinden CloudFront.
- [ ] CloudFront `viewerProtocolPolicy: REDIRECT_TO_HTTPS` zorunlu.
- [ ] GitHub Actions → AWS bağlantısı **OIDC federated role** ile yapılmalı; statik `AWS_ACCESS_KEY_ID`/`SECRET` GitHub Secrets'a konmamalı.
- [ ] CDK deploy IAM rolü least-privilege (bu stack'e scope edilmiş policy, `*:*` yok).

**P1 — production öncesi tamamlanmalı**
- [ ] SPA routing için CloudFront `errorResponses`: 403/404 → `/index.html` (200).
- [ ] Custom domain + ACM (us-east-1) + Route53; `*.cloudfront.net` kalıcı prod URL'i olmamalı.
- [ ] Deploy sonrası `aws cloudfront create-invalidation` adımı pipeline'a eklenmeli.
- [ ] Tag standardı (`Project`, `Environment`, `ManagedBy=CDK`).

**P2 — operasyonel olgunluk**
- [ ] CloudFront + S3 access log aktif.
- [ ] CloudWatch alarm: 5xx oranı, origin latency.
- [ ] AWS Managed Rules (Core rule set) WAF değerlendirilmeli.
- [ ] Staging/prod ayrımı için ayrı CDK context (`-c env=staging`).

> Not: `cdk-infra/` klasörü henüz oluşturulmadı; bu maddeler Step 2'de kodun ilk sürümüne dahil edilmeli, sonradan yama olarak eklenmemelidir.