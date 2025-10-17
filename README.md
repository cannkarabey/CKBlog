CKBlog 
Projenin Amacı
CKBlog, Vue 3 ve Composition API kullanılarak geliştirilmiş modern bir kişisel blog ve portföy sitesidir. Proje; blog yazılarını, tamamlanan projeleri ve geliştirici hakkındaki bilgileri sunmayı amaçlar. Ayrıca, tüm içeriğin kolayca yönetilebilmesi için kapsamlı bir admin paneli içerir.

Frontend geliştirme sürecini hızlandırmak ve backend'den bağımsız çalışabilmek için esnek bir mock API sistemi ile donatılmıştır.

Kullanılan Teknolojiler
Frontend: Vue 3 (Composition API), Vite, TypeScript

Routing: Vue Router

State Management: Pinia

HTTP Client: Axios

Uluslararasılaştırma (i18n): vue-i18n

SEO & Meta Yönetimi: @vueuse/head

Styling: CSS (Global Değişkenler ile)

Kurulum
Projeyi klonlayın:

Bash

git clone <repository-url>
cd ckblog
Gerekli NPM paketlerini yükleyin:

Bash

npm install
.env.local dosyasını oluşturun ve ortam değişkenlerini yapılandırın. Mock API ile çalışmak için aşağıdaki değişkeni ekleyin:

Kod snippet'i

VITE_USE_MOCK=1
Çalıştırma
Geliştirme sunucusunu başlatın:

Bash

npm run dev
Uygulamayı tarayıcıda açın: http://localhost:5173

Proje Yapısı
src/
 ├─ adapters/      # Axios instance ve interceptor'lar (http.ts)
 ├─ api/           # Alan bazlı API servisleri (auth, posts, projects)
 ├─ assets/        # Statik varlıklar (resimler, fontlar)
 ├─ components/    # Paylaşılan ve genel Vue bileşenleri (Header, Footer, vb.)
 ├─ composables/   # Tekrar kullanılabilir Composition API fonksiyonları (useSeo)
 ├─ i18n/          # Dil dosyaları (tr.json, en.json)
 ├─ layouts/       # Sayfa düzenleri (MainLayout, AdminLayout)
 ├─ mocks/         # Backend mock verileri ve servisleri (posts, projects)
 ├─ pages/         # Rotalara karşılık gelen sayfalar (Home, Blog, Admin)
 ├─ router/        # Vue Router yapılandırması ve guard'lar
 ├─ stores/        # Pinia store modülleri (auth, ui)
 └─ styles/        # Global CSS stilleri (base.css)
Öne Çıkan Özellikler
--- Frontend & UI Özellikleri ---
Çok Dilli Destek: vue-i18n ile /tr ve /en gibi locale tabanlı URL yapısı. Dil geçişleri LangSwitcher bileşeni ile yönetilir.

State Management: Pinia ile merkezi state yönetimi. authStore kullanıcı oturum bilgilerini, uiStore ise tema (dark mode) gibi arayüz durumlarını tutar.

Dinamik SEO: @vueuse/head ve useSeo composable'ı sayesinde her sayfa için dinamik olarak <title> ve meta (OG) etiketleri oluşturulur.

Modern UI: Global CSS değişkenleri (base.css) ile yönetilen tutarlı bir tasarım dili. Responsive (mobil uyumlu) yapı.

Sayfa Yapıları:

Anasayfa: Hero Slider, son yazılar ve öne çıkan projeler bölümleri.

Blog & Projeler: Arama, filtreleme ve grid tabanlı listeleme.

--- Admin Panel ---
Yetkilendirme: Rota tabanlı koruma (requiresAdmin guard) ve authStore üzerinden token yönetimi.

Layout: AdminLayout ve AdminSidebar ile yönetilen, modüler ve kullanışlı bir arayüz.

CRUD İşlemleri: Yazılar, projeler, medya ve yorumlar için tam kapsamlı oluşturma, okuma, güncelleme ve silme (CRUD) arayüzleri.

Genel Bileşenler:

AdminTable.vue: Farklı veri türlerini listeleyebilen, slot tabanlı jenerik tablo bileşeni.

MediaPicker.vue: Yazı ve projelere kapak görseli eklemek için kullanılan modal tabanlı medya seçici.

--- API & Mock Sistemi ---
Merkezi HTTP Yönetimi: adapters/http.ts içinde tanımlanan axios instance'ı, tüm API isteklerini yönetir. Interceptor'lar ile otomatik olarak Authorization başlığı eklenir ve hata durumları yönetilir.

Değiştirilebilir Backend: .env dosyasındaki VITE_USE_MOCK değişkeni 1 yapıldığında, uygulama gerçek bir backend yerine mocks/ klasöründeki statik verilerle çalışır. Bu, frontend geliştirmesini backend'den bağımsız hale getirir.

Mevcut Durum
--- Tamamlananlar ---
Vue 3 projesinin temel iskeleti ve modern proje yapısı.

Ana kullanıcı arayüzü sayfaları (Anasayfa, Blog, Projeler, Hakkında).

Uluslararasılaştırma (TR/EN) altyapısı ve dil geçişleri.

Dinamik SEO meta etiket sistemi.

Mock API verileriyle çalışan tam fonksiyonel Admin Paneli (Giriş, CRUD ekranları).

Dark mode desteği.

--- Geliştirilecekler / Eksikler ---
Blog sayfası için etiket/kategori bazlı filtreleme ve sayfalama (pagination).

Proje detay sayfasının tasarımı ve içeriğinin zenginleştirilmesi.

Admin panelindeki yazı düzenleyiciye bir Markdown editörü entegrasyonu.

Backend tamamlandığında gerçek API servis bağlantıları ve sitemap.xml oluşturma.
