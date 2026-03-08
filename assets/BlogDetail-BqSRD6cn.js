import{d as S,m as $,u as C,i as g,c as i,n as K,e as t,l as z,b as e,t as s,o as n,h as _,a as r,j as U,v as H,p as N,q as P,s as R,k as y,F as j,g as F,f as x}from"./index-CcvTVLtm.js";import{u as O,A as Y,C as E}from"./useSeo-5JJnSA6R.js";import{c as h,_ as I}from"./_plugin-vue_export-helper-DVLSPQxf.js";import{S as G}from"./send-BOMS-I5i.js";import{g as J}from"./posts-C1luC0Nw.js";import{C as X}from"./clock-DheE_oQq.js";/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=h("bookmark-check",[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}]]);/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=h("bookmark",[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}]]);/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=h("link-2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=h("log-in",[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]]);/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=h("message-square",[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]);/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=h("share-2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=h("tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]),se=["title"],le=S({__name:"SaveButton",props:{postId:{}},setup(b){const l=b,d=$(),{locale:o}=C(),u=g(()=>`ckblog:saved:${d.user?.id||"anon"}`),k=g(()=>JSON.parse(localStorage.getItem(u.value)||"[]")),m=g(()=>k.value.includes(l.postId));function a(){const c=new Set(k.value);c.has(l.postId)?c.delete(l.postId):c.add(l.postId),localStorage.setItem(u.value,JSON.stringify([...c]))}return(c,f)=>(n(),i("button",{class:K(["save-btn",{"is-saved":m.value}]),onClick:a,title:m.value?t(o)==="tr"?"Kaydedildi":"Saved":t(o)==="tr"?"Kaydet":"Save"},[m.value?(n(),z(t(W),{key:0,class:"save-icon"})):(n(),z(t(Q),{key:1,class:"save-icon"})),e("span",null,s(m.value?t(o)==="tr"?"Kaydedildi":"Saved":t(o)==="tr"?"Kaydet":"Save"),1)],10,se))}}),ne=I(le,[["__scopeId","data-v-f1a2c5f6"]]),ie={class:"comment-section"},ce={class:"comment-header"},re={class:"comment-title"},de={class:"comment-form"},ue=["placeholder","disabled"],me={class:"comment-form-footer"},pe={key:0,class:"comment-auth-msg"},ve={key:1,class:"comment-success"},ge={key:2,class:"comment-spacer"},he=["disabled"],ke=S({__name:"CommentBox",setup(b){const l=$(),{locale:d}=C(),o=_(""),u=_(!1);function k(){l.isAuthed&&(u.value=!0,o.value="",setTimeout(()=>u.value=!1,3e3))}return(m,a)=>(n(),i("div",ie,[e("div",ce,[r(t(te),{class:"comment-header-icon"}),e("h3",re,s(t(d)==="tr"?"Yorumlar":"Comments"),1)]),e("div",de,[U(e("textarea",{"onUpdate:modelValue":a[0]||(a[0]=c=>o.value=c),class:"comment-textarea",rows:"4",placeholder:t(d)==="tr"?"Düşüncelerini paylaş...":"Share your thoughts...",disabled:!t(l).isAuthed},null,8,ue),[[H,o.value]]),e("div",me,[t(l).isAuthed?u.value?(n(),i("div",ve,s(t(d)==="tr"?"Yorum gönderildi!":"Comment submitted!"),1)):(n(),i("div",ge)):(n(),i("div",pe,[r(t(ee),{class:"auth-msg-icon"}),e("span",null,s(t(d)==="tr"?"Yorum yapmak için giriş yapmalısın.":"Sign in to leave a comment."),1)])),e("button",{class:"comment-submit",disabled:!t(l).isAuthed||!o.value.trim(),onClick:k},[r(t(G),{class:"submit-icon"}),e("span",null,s(t(d)==="tr"?"Gönder":"Submit"),1)],8,he)])])]))}}),_e=I(ke,[["__scopeId","data-v-937108d0"]]),ye={key:0,class:"blog-detail-loading"},be={class:"loading-text"},fe={key:1,class:"blog-detail"},xe={class:"blog-detail-nav"},Se={class:"blog-detail-hero"},Ce=["src","alt"],Ie={class:"blog-detail-content"},Me={class:"blog-detail-header"},we={key:0,class:"blog-tags"},ze={class:"blog-title"},Ae={key:1,class:"blog-excerpt"},Be={class:"blog-meta"},$e={class:"meta-left"},Te={key:0,class:"meta-item"},qe={class:"meta-item"},Le={class:"blog-actions"},Ve={class:"action-group"},De=["href","title"],Ke=["title"],Ue={class:"blog-body"},He=["innerHTML"],Ne={class:"blog-comments"},A="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",B=`
  <h2>Modern Web Geliştirme</h2>
  <p>Bu içerik <strong>mock modunda</strong> gösteriliyor. Backend bağlandığında gerçek içerik buraya yüklenecek.</p>
  <p>Vue 3 Composition API ile modern, reactive ve performanslı uygulamalar geliştirebilirsiniz. <code>ref</code>, <code>reactive</code>, <code>computed</code> ve <code>watchEffect</code> gibi yapılar sayesinde state yönetimi oldukça basitleşiyor.</p>
  <blockquote>İyi bir geliştirici olmak için sürekli öğrenmek ve paylaşmak gerekir.</blockquote>
  <h3>Temel Kavramlar</h3>
  <ul>
    <li><strong>Reactivity:</strong> Vue'nun reaktif sistemi sayesinde veri değişiklikleri otomatik olarak DOM'a yansır.</li>
    <li><strong>Composition API:</strong> Mantığı fonksiyonel olarak organize etmenizi sağlar.</li>
    <li><strong>TypeScript:</strong> Tip güvenliği ile hataları compile time'da yakalarsınız.</li>
  </ul>
  <pre><code>const count = ref(0)
const doubled = computed(() => count.value * 2)</code></pre>
  <p>Daha fazla bilgi için resmi <a href="https://vuejs.org">Vue.js</a> dokümantasyonuna göz atabilirsiniz.</p>
`,Pe=S({__name:"BlogDetail",setup(b){const l=N(),d=R(),{locale:o,t:u}=C(),k=l.params.slug,m=_(!0),a=_(null),c=_(!1),f=g(()=>typeof window<"u"?window.location.origin+l.fullPath:"");P(()=>{const p=J(k);if(!p){d.replace({name:"blog-list",params:{locale:l.params.locale||"tr"}});return}a.value=p,O({title:p.title,description:p.excerpt,image:p.image||p.coverImageUrl||A}),m.value=!1});const M=g(()=>a.value?.publishedAt?new Date(a.value.publishedAt).toLocaleDateString(o.value==="tr"?"tr-TR":"en-US",{year:"numeric",month:"long",day:"numeric"}):""),T=g(()=>{const v=(a.value?.content||B).replace(/<[^>]+>/g,"").split(/\s+/).length;return Math.max(1,Math.ceil(v/200))}),q=g(()=>a.value?.image||a.value?.coverImageUrl||A),L=g(()=>a.value?.content||B);function V(){navigator.clipboard.writeText(f.value),c.value=!0,setTimeout(()=>c.value=!1,2e3)}function D(){d.push({name:"blog-list",params:{locale:l.params.locale||"tr"}})}return(p,v)=>m.value?(n(),i("div",ye,[v[0]||(v[0]=e("div",{class:"loading-spinner"},null,-1)),e("p",be,s(t(u)("common.loading")),1)])):a.value?(n(),i("article",fe,[e("div",xe,[e("button",{class:"back-btn",onClick:D},[r(t(Y),{class:"back-icon"}),e("span",null,s(t(u)("nav.blog")),1)])]),e("div",Se,[e("img",{src:q.value,alt:a.value.title,loading:"lazy",class:"hero-cover-img"},null,8,Ce),v[1]||(v[1]=e("div",{class:"hero-cover-overlay"},null,-1))]),e("div",Ie,[e("header",Me,[a.value.tags?.length?(n(),i("div",we,[(n(!0),i(j,null,F(a.value.tags,w=>(n(),i("span",{key:w,class:"blog-tag"},[r(t(oe),{class:"tag-icon"}),x(" "+s(w),1)]))),128))])):y("",!0),e("h1",ze,s(a.value.title),1),a.value.excerpt?(n(),i("p",Ae,s(a.value.excerpt),1)):y("",!0),e("div",Be,[e("div",$e,[M.value?(n(),i("span",Te,[r(t(E),{class:"meta-icon"}),x(" "+s(M.value),1)])):y("",!0),v[2]||(v[2]=e("span",{class:"meta-divider"},null,-1)),e("span",qe,[r(t(X),{class:"meta-icon"}),x(" "+s(T.value)+" "+s(t(u)("blog.readingTime")),1)])])])]),e("div",Le,[r(ne,{postId:a.value.id},null,8,["postId"]),e("div",Ve,[e("a",{class:"action-btn",href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(a.value.title)}&url=${encodeURIComponent(f.value)}`,target:"_blank",rel:"noopener",title:t(o)==="tr"?"X'te Paylaş":"Share on X"},[r(t(ae),{class:"action-icon"}),e("span",null,s(t(o)==="tr"?"Paylaş":"Share"),1)],8,De),e("button",{class:"action-btn",onClick:V,title:t(o)==="tr"?"Linki Kopyala":"Copy Link"},[r(t(Z),{class:"action-icon"}),e("span",null,s(c.value?t(o)==="tr"?"Kopyalandı!":"Copied!":t(o)==="tr"?"Kopyala":"Copy"),1)],8,Ke)])]),e("div",Ue,[e("div",{class:"prose",innerHTML:L.value},null,8,He)]),e("div",Ne,[r(_e)])])])):y("",!0)}}),Ge=I(Pe,[["__scopeId","data-v-9bb3c22f"]]);export{Ge as default};
