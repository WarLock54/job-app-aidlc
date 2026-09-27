# Secret & Identity Policy

Bulut sağlayıcı entegrasyonu eklendiğinde (AWS/Azure/Firebase) uyulacak minimum kurallar:

1. Password, API key, PAT, SAS token, connection string kaynak kodda, `.tfvars`/`.env` dosyasında veya commit geçmişinde açık metin tutulamaz.
2. CI/CD → bulut erişimi OIDC/federated identity ile yapılır; statik access key/PAT GitHub Secrets'a bile konmaz (kaçınılmazsa rotasyon süresi belgelenir).
3. Secret gerekiyorsa bulut sağlayıcının secret servisi kullanılır (AWS Secrets Manager/Parameter Store, Azure Key Vault).
4. IaC deploy rolleri least-privilege'dır; `*:*` veya `Contributor` gibi geniş roller kullanılmaz.
5. Depolama servisleri varsayılan private'dır; public erişim sadece CDN üzerinden, gerekçeli verilir.
6. Yeni bulut kaynağı eklenmeden önce ilgili `*_deployment_plan.md`'deki P0 maddeleri tamamlanmadan `deploy`/`apply` çalıştırılmaz.
7. `job-app/src/services/authService.js` **mock kimlik doğrulamadır** (herhangi bir e-posta/şifreyi kabul eder). Gerçek kullanıcı verisi işlenecekse gerçek bir auth sağlayıcı (Cognito/Auth0/Entra ID) ile değiştirilmeden prod'a çıkılamaz.