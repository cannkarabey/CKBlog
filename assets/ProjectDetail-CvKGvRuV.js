import{d as b,u as S,p as j,h as v,q as V,i as P,c as a,k as o,b as t,t as i,e as r,a as s,F as x,g as D,f as g,s as C,o as l}from"./index-CcvTVLtm.js";import{u as E,A as I,C as T}from"./useSeo-5JJnSA6R.js";import{c as z,_ as U}from"./_plugin-vue_export-helper-DVLSPQxf.js";import{G as w}from"./github-ZS8FgwPD.js";import{E as L}from"./external-link-BTwfMIOC.js";/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=z("shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]),M={key:0,class:"project-detail-loading"},B={class:"loading-text"},F={key:1,class:"project-detail"},N={class:"project-detail-nav"},q={class:"project-detail-hero"},A=["src","alt"],R={class:"project-detail-content"},K={class:"project-detail-header"},Y={key:0,class:"project-tags"},G={class:"project-title"},H={key:1,class:"project-summary"},J={class:"project-meta"},Q={class:"meta-left"},W={key:0,class:"meta-item"},X={key:1,class:"meta-divider"},Z={key:2,class:"meta-item"},$={class:"project-actions"},ee={class:"action-group"},te=["href"],ae=["href"],le={key:0,class:"project-body"},oe=["innerHTML"],ie=b({__name:"ProjectDetail",setup(re){const c=[{id:"p1",title:"CVE Explorer",slug:"cve-explorer",coverImage:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",summary:"Elasticsearch tabanlı güvenlik açığı arama ve analiz platformu. CVE kayıtlarını hızlıca arayabilir, filtreleyebilir ve detaylarını inceleyebilirsiniz.",content:`
<h2>Mimari</h2>
<p>Proje, Elasticsearch üzerinde indekslenen CVE verilerini Vue 3 tabanlı bir SPA ile sunar. Arama sonuçları debounce ile optimize edilmiştir.</p>
<ul>
  <li><strong>Frontend:</strong> Vue 3 Composition API, TypeScript</li>
  <li><strong>Backend:</strong> Node.js + Express REST API</li>
  <li><strong>Veritabanı:</strong> Elasticsearch 8.x</li>
  <li><strong>Veri Kaynağı:</strong> NVD (National Vulnerability Database)</li>
</ul>
<h3>Öne Çıkanlar</h3>
<ul>
  <li>Full-text search ile milisaniye seviyesinde sorgulama</li>
  <li>Severity (CVSS) filtresi ve tarih aralığı seçimi</li>
  <li>Detay sayfasında referans linkleri ve etkilenen ürünler</li>
  <li>Responsive kart tabanlı listeleme</li>
</ul>
<blockquote>Güvenlik açıklarını takip etmek, sadece savunma değil — bir alışkanlıktır.</blockquote>`,techStack:["Vue 3","TypeScript","Node.js","Elasticsearch"],repoUrl:"https://github.com/username/cve-explorer",liveUrl:"https://cve.example.com",year:"2025",role:"Full-Stack"},{id:"p2",title:"YOLOv8 Drone",slug:"yolov8-drone",coverImage:"https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",summary:"Drone üzerinde gerçek zamanlı nesne tespiti. YOLOv8 modeli ile eğitim ve inference pipeline.",content:`
<h2>Proje Detayı</h2>
<p>Bu proje, drone kameralarından gelen canlı görüntülerde YOLOv8 modeliyle nesne tespiti yapmayı amaçlar.</p>
<ul>
  <li><strong>Model:</strong> YOLOv8n (nano) — düşük gecikmeli inference</li>
  <li><strong>Framework:</strong> Ultralytics + OpenCV</li>
  <li><strong>Veri Seti:</strong> Özel etiketlenmiş drone görüntüleri</li>
</ul>
<h3>Sonuçlar</h3>
<p>Model, 30 FPS hızında %87 mAP50 başarımı elde etmiştir.</p>`,techStack:["Python","YOLOv8","OpenCV","Ultralytics"],repoUrl:"https://github.com/username/yolov8-drone",year:"2025",role:"ML Engineer"},{id:"p3",title:"CKBlog",slug:"ckblog",coverImage:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",summary:"Kişisel blog ve proje vitrini. Komponent tabanlı arayüz, mock veri ile hızlı prototip.",content:`
<h2>Mimari</h2>
<ul>
  <li><strong>Frontend:</strong> Vue 3, Vite, Router, Pinia</li>
  <li><strong>Stil:</strong> Tailwind CSS 4, Space Grotesk + DM Sans tipografi</li>
  <li><strong>Backend:</strong> (MVP) mock veri; plan: Node/Express + Prisma</li>
</ul>
<h3>Öne Çıkanlar</h3>
<ul>
  <li>Blog, Proje ve Hakkımda sayfaları için tutarlı UI sistemi</li>
  <li>Türkçe / İngilizce çok dilli destek (vue-i18n)</li>
  <li>Dark mode temalı design token sistemi</li>
  <li>Yorum ve Kaydet (mock) bileşenleri</li>
</ul>`,techStack:["Vue 3","TypeScript","Vite","Tailwind CSS","Pinia"],repoUrl:"https://github.com/username/ckblog",liveUrl:"https://ckblog.example.com",year:"2025",role:"Frontend Developer"},{id:"p4",title:"Öğrenci Portal",slug:"ogrenci-portal",coverImage:"https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1600&auto=format&fit=crop",summary:"Not ve ders yönetimi uygulaması. Express + PostgreSQL backend ile RESTful API.",content:`
<h2>Proje Kapsamı</h2>
<p>Öğrencilerin derslerini, notlarını ve ödevlerini yönetebilecekleri full-stack bir web uygulaması.</p>
<ul>
  <li><strong>Auth:</strong> JWT tabanlı kimlik doğrulama</li>
  <li><strong>CRUD:</strong> Ders, not, ödev işlemleri</li>
  <li><strong>Dashboard:</strong> Özet istatistikler ve takvim görünümü</li>
</ul>`,techStack:["Vue","Express","PostgreSQL","JWT"],repoUrl:"https://github.com/username/ogrenci-portal",year:"2024",role:"Full-Stack"},{id:"p5",title:"Portfolio",slug:"portfolio",coverImage:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",summary:"Kişisel site ve portfolyo. Responsive tasarım, dark mode, animasyonlar.",content:`
<h2>Tasarım Yaklaşımı</h2>
<p>Mobile-first responsive tasarım. CSS custom property ile tema yönetimi.</p>
<ul>
  <li>Intersection Observer ile scroll animasyonları</li>
  <li>Dark / Light mode geçişi</li>
  <li>Proje ve beceri kartları</li>
</ul>`,techStack:["Vue","Tailwind CSS"],repoUrl:"https://github.com/username/portfolio",liveUrl:"https://portfolio.example.com",year:"2024",role:"Frontend Developer"},{id:"p6",title:"CK Notes",slug:"ck-notes",coverImage:"https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1600&auto=format&fit=crop",summary:"Tarayıcı içi not alma uygulaması. IndexedDB ile offline destek.",content:`
<h2>Teknik Detaylar</h2>
<p>Tüm veriler IndexedDB’de saklanır, sunucu gerektirmez.</p>
<ul>
  <li>Markdown desteği ile zengin not biçimlendirme</li>
  <li>Etiketleme ve arama özellikleri</li>
  <li>Export/Import (JSON format)</li>
</ul>`,techStack:["Vue","IndexedDB"],repoUrl:"https://github.com/username/ck-notes",year:"2024",role:"Frontend Developer"}],m=j(),k=C(),{locale:se,t:n}=S(),y=m.params.slug,p=v(!0),e=v(null);V(()=>{e.value=c.find(u=>u.slug===y)||c[0],e.value&&E({title:e.value.title,description:e.value.summary,image:e.value.coverImage}),p.value=!1});const f=P(()=>e.value?.coverImage||"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop");function _(){k.push({name:"projects",params:{locale:m.params.locale||"tr"}})}return(u,d)=>p.value?(l(),a("div",M,[d[0]||(d[0]=t("div",{class:"loading-spinner"},null,-1)),t("p",B,i(r(n)("common.loading")),1)])):e.value?(l(),a("article",F,[t("div",N,[t("button",{class:"back-btn",onClick:_},[s(r(I),{class:"back-icon"}),t("span",null,i(r(n)("projects.backToProjects")),1)])]),t("div",q,[t("img",{src:f.value,alt:e.value.title,loading:"lazy",class:"hero-cover-img"},null,8,A)]),t("div",R,[t("header",K,[e.value.techStack?.length?(l(),a("div",Y,[(l(!0),a(x,null,D(e.value.techStack,h=>(l(),a("span",{key:h,class:"project-tag"},i(h),1))),128))])):o("",!0),t("h1",G,i(e.value.title),1),e.value.summary?(l(),a("p",H,i(e.value.summary),1)):o("",!0),t("div",J,[t("div",Q,[e.value.year?(l(),a("span",W,[s(r(T),{class:"meta-icon"}),g(" "+i(e.value.year),1)])):o("",!0),e.value.role?(l(),a("span",X)):o("",!0),e.value.role?(l(),a("span",Z,[s(r(O),{class:"meta-icon"}),g(" "+i(e.value.role),1)])):o("",!0)])])]),t("div",$,[t("div",ee,[e.value.repoUrl?(l(),a("a",{key:0,class:"action-btn",href:e.value.repoUrl,target:"_blank",rel:"noopener"},[s(r(w),{class:"action-icon"}),t("span",null,i(r(n)("projects.viewRepo")),1)],8,te)):o("",!0),e.value.liveUrl?(l(),a("a",{key:1,class:"action-btn action-btn-primary",href:e.value.liveUrl,target:"_blank",rel:"noopener"},[s(r(L),{class:"action-icon"}),t("span",null,i(r(n)("projects.viewLive")),1)],8,ae)):o("",!0)])]),e.value.content?(l(),a("div",le,[t("div",{class:"prose",innerHTML:e.value.content},null,8,oe)])):o("",!0)])])):o("",!0)}}),de=U(ie,[["__scopeId","data-v-132967c0"]]);export{de as default};
