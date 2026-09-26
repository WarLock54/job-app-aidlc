# Job Application Site – AI-DLC Workshop

🔗 **Canlı site:** https://warlock54.github.io/job-app-aidlc/

İş ilanlarını arama, görüntüleme ve başvuru yapma imkânı sunan bir iş başvuru sitesi. Proje, **AWS AI-DLC (AI-Driven Development Life Cycle)** metodolojisiyle, yapay zeka asistanı (Claude Code) kullanılarak fikirden canlı siteye kadar uçtan uca geliştirildi.

## Teknolojiler

| Alan | Kullanılan |
|---|---|
| Uygulama | React 18, Vite 5, React Router (HashRouter) |
| Arayüz | Bootstrap 5 (CDN), Bootstrap Icons, özel tema (teal / koyu gri / turuncu) |
| Veri & Auth | Mock servisler (50+ örnek ilan, localStorage tabanlı oturum) |
| Test | Vitest 3.2.7, React Testing Library, jsdom |
| CI/CD | GitHub Actions → GitHub Pages |
| Araçlar | Git, GitHub CLI, Claude Code |

## AI-DLC Süreci

Her aşama aynı döngüyle ilerledi: **AI plan yazar → plan incelenir ve kararlar eklenir → onay → AI adım adım uygular ve adımları işaretler.** Tüm planlar `aidlc-docs/plans/`, tüm promptlar `aidlc-docs/prompts.md` içinde kayıtlı.

| # | Aşama | Plan | Çıktı |
|---|---|---|---|
| 0 | Setup | – | `aidlc-docs/` klasör yapısı |
| 1 | Inception – User Stories | `user_stories_plan.md` | `story-artifacts/user_stories.md` (2 persona, 4 story, 11 kabul kriteri) |
| 2 | Inception – Units | `units_plan.md` | `design-artifacts/units.md` (Identity & Access, Job Catalog & Discovery, Application Management) |
| 3 | Construction – Component Model | `component_model_plan.md` | `design-artifacts/component_model.md` |
| 4 | Construction – Code Generation | `react_app_plan.md` | `job-app/` React uygulaması |
| 5 | Operations – Deployment | `github_deployment_plan.md` | `.github/workflows/deploy.yml`, GitHub Pages |
| 6 | QA – Acceptance Testing | `test_plan.md` | `design-artifacts/traceability_matrix.md`, `job-app/src/__tests__/` |

> **Workshop'tan sapma:** Orijinal workshop Step 5'te AWS CDK (S3 + CloudFront) kullanıyor. Bu projede ücretsiz olduğu ve hazır CI/CD sunduğu için **GitHub Actions + GitHub Pages** tercih edildi.

## Test Süreci

### Amaç
Build'in başarılı olması ve sitenin HTTP 200 dönmesi, özelliklerin doğru çalıştığını kanıtlamaz. Bu yüzden `user_stories.md` içindeki **her kabul kriteri için bir otomatik test** yazıldı. Testler uygulamanın mevcut davranışına göre değil, **kriter metnine birebir uyacak şekilde** yazıldı.

### Yöntem
- Her test gerçek `App` bileşenini render eder ve kullanıcı gibi arayüz üzerinden etkileşir (tıklama, yazma).
- Her kriter bir teste, her test bir bileşene bağlandı. Bu eşleme `aidlc-docs/design-artifacts/traceability_matrix.md` dosyasında tutuluyor.
- Testler build paketine dahil değil, canlı site etkilenmiyor.

### Sonuç: 9 / 11 geçti

| Story | Kabul kriteri | Sonuç |
|---|---|---|
| 1. İş arama & filtreleme | AC-1.1 Anahtar kelimeyle arama | ✅ Geçti (not: submit yerine anlık filtreleme) |
| | AC-1.2 Kategoriye göre filtreleme | ✅ Geçti |
| | AC-1.3 Sonuç yoksa mesaj | ✅ Geçti |
| 2. İş detayı | AC-2.1 Detay sayfasına gitme | ✅ Geçti (not: tüm kart tıklanabilir) |
| | AC-2.2 Detay içeriği | ✅ Geçti |
| 3. Başvuru | AC-3.1 Başvuru formu | ❌ Kaldı |
| | AC-3.2 Form gönderiminde başarı mesajı | ❌ Kaldı |
| | AC-3.3 Misafir kullanıcıya giriş uyarısı | ✅ Geçti |
| 4. Kimlik doğrulama | AC-4.1 Giriş | ✅ Geçti |
| | AC-4.2 Kayıt | ⚠️ Şartlı geçti |
| | AC-4.3 Çıkış | ✅ Geçti |

### Bilinen eksikler (bilinçli olarak bırakıldı)
- **AC-3.1 / AC-3.2:** Başvuru formu yok. Giriş yapmış kullanıcı "Apply Now"a basınca doğrudan başarı mesajı görüyor. `component_model.md`'de tasarlanan Application Component ve Application Service koda dönüştürülmemiş. Test süreci tasarım ile uygulama arasındaki bu boşluğu ortaya çıkardı.
- **AC-4.2:** Ayrı bir kayıt sayfası yok. Tek bir "Login / Register" formu var ve mock auth her e-posta/şifreyi kabul ediyor. Bu, Step 4'te bilinçli olarak verilmiş bir karar.
- **Erişilebilirlik:** Giriş formundaki etiketler input alanlarına bağlı değil.
- **CI test kapısı:** `npm test` adımı henüz `deploy.yml`'a eklenmedi. Kalan iki kriter yüzünden eklenirse her deploy engellenirdi.

Düzeltme önerisi (`applicationService.js` + `ApplicationForm.jsx`) izlenebilirlik matrisinde kayıtlı, ileride ayrı bir plan–onay döngüsüyle uygulanabilir.

## Yerelde Çalıştırma

```bash
cd job-app
npm ci
npm run build   # üretim build'i (dist/)
npm test        # kabul kriteri testleri
```

## Dağıtım

`main` dalına yapılan her push, GitHub Actions ile otomatik olarak build edilir ve GitHub Pages'e yayınlanır. Durum için repodaki **Actions** sekmesine bakabilirsiniz.

## Proje Yapısı

```
├── .github/workflows/deploy.yml   # CI/CD hattı
├── aidlc-docs/
│   ├── prompts.md                 # Tüm promptlar, sırasıyla
│   ├── plans/                     # Her aşamanın plan dosyası
│   ├── requirements/
│   ├── story-artifacts/           # User stories
│   └── design-artifacts/          # Units, component model, traceability matrix
└── job-app/                       # React + Vite uygulaması ve testleri
```
