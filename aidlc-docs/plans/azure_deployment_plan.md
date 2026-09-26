# Plan: IaC/DevOps - Deploy with Azure & Terraform

## Objective
Deploy the React application to Azure Blob Storage configured for static website hosting, provisioned entirely through modular Terraform configurations.

## Steps
- [ ] **Step 1: Initialize Terraform Environment**
  - Create an `azure-infra` directory and define a `main.tf` configuration file.
- [ ] **Step 2: Define Infrastructure (IaC)**
  - Define an `azurerm_resource_group`.
  - Define an `azurerm_storage_account` with `static_website` enabled (index document: `index.html`).
  - Configure output blocks for the primary web endpoint.
- [ ] **Step 3: Deploy Infrastructure**
  - Run `terraform init` followed by `terraform apply -auto-approve`.
- [ ] **Step 4: Deploy React App Assets**
  - Use the Azure CLI to upload assets: `az storage blob upload-batch -s ../job-app/dist -d $web --account-name <ACCOUNT_NAME>`.