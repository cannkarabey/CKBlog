import{d as w,u as C,h as x,q as A,A as S,c as p,b as t,a as s,r as V,e,w as m,F as M,g as $,l as h,t as u,T as F,p as G,s as H,o as a,f as y,k as T,z}from"./index-CcvTVLtm.js";import{c as i,_ as D}from"./_plugin-vue_export-helper-DVLSPQxf.js";import{G as N,L as q,M as E}from"./mail-DM8V90Wf.js";import{X as K}from"./x-dIXZhbSH.js";import{G as O}from"./github-ZS8FgwPD.js";/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=i("book-open",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=i("folder-kanban",[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",key:"1fr9dc"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M12 10v2",key:"hh53o1"}],["path",{d:"M16 10v6",key:"1d6xys"}]]);/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=i("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]);/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=i("moon",[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]);/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=i("sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-vue-next v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=i("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),J={class:"site-header"},Q={class:"header-inner container-main"},W={class:"desktop-nav"},ee={class:"header-controls"},te=["aria-label"],ae={key:0,class:"mobile-panel"},oe={class:"container-main mobile-nav"},se=w({__name:"AppHeader",setup(j){const k=G(),v=H(),{t:_,locale:n}=C(),d=x(!1),c=x(!0),f=[{key:"blog",icon:R,path:"blog"},{key:"projects",icon:U,path:"projects"},{key:"about",icon:Z,path:"about"}];A(()=>{const l=localStorage.getItem("ckblog:theme");c.value=l?l==="dark":!0,g()});function B(){c.value=!c.value,localStorage.setItem("ckblog:theme",c.value?"dark":"light"),g()}function g(){document.documentElement.classList.toggle("light",!c.value)}function I(){const l=n.value==="tr"?"en":"tr";n.value=l;const r=k.path.replace(/^\/(tr|en)/,"");v.push(`/${l}${r}`)}function L(){d.value=!1}return S(()=>k.path,L),(l,r)=>{const b=V("router-link");return a(),p("header",J,[t("div",Q,[s(b,{to:`/${e(n)}`,class:"logo"},{default:m(()=>[...r[1]||(r[1]=[y(" CKBlog",-1),t("span",{class:"logo-dot"},null,-1)])]),_:1},8,["to"]),t("nav",W,[(a(),p(M,null,$(f,o=>s(b,{key:o.key,to:`/${e(n)}/${o.path}`,class:"nav-link","active-class":"nav-link--active"},{default:m(()=>[y(u(e(_)(`nav.${o.key}`)),1)]),_:2},1032,["to"])),64))]),t("div",ee,[t("button",{onClick:B,class:"control-btn","aria-label":c.value?"Switch to light mode":"Switch to dark mode"},[c.value?(a(),h(e(Y),{key:0,class:"control-icon"})):(a(),h(e(X),{key:1,class:"control-icon"}))],8,te),t("button",{onClick:I,class:"control-btn locale-btn"},[s(e(N),{class:"control-icon"}),t("span",null,u(e(n).toUpperCase()),1)]),t("button",{onClick:r[0]||(r[0]=o=>d.value=!d.value),class:"control-btn mobile-toggle"},[d.value?(a(),h(e(K),{key:1,class:"control-icon"})):(a(),h(e(P),{key:0,class:"control-icon"}))])])]),s(F,{"enter-active-class":"mobile-enter-active","leave-active-class":"mobile-leave-active","enter-from-class":"mobile-enter-from","leave-to-class":"mobile-leave-to"},{default:m(()=>[d.value?(a(),p("div",ae,[t("nav",oe,[(a(),p(M,null,$(f,o=>s(b,{key:o.key,to:`/${e(n)}/${o.path}`,class:"mobile-link","active-class":"mobile-link--active"},{default:m(()=>[(a(),h(z(o.icon),{class:"mobile-link-icon"})),y(" "+u(e(_)(`nav.${o.key}`)),1)]),_:2},1032,["to"])),64))])])):T("",!0)]),_:1})])}}}),_e=D(se,[["__scopeId","data-v-43084f89"]]),ne={class:"border-t border-border-default bg-bg-primary"},ce={class:"container-main py-8 flex flex-col md:flex-row items-center justify-between gap-4"},le={class:"text-sm text-text-muted"},re={class:"flex items-center gap-4"},ie={href:"https://github.com",target:"_blank",rel:"noopener",class:"text-text-muted hover:text-accent transition-colors duration-200","aria-label":"GitHub"},de={href:"https://linkedin.com",target:"_blank",rel:"noopener",class:"text-text-muted hover:text-accent transition-colors duration-200","aria-label":"LinkedIn"},he={href:"mailto:contact@ckblog.com",class:"text-text-muted hover:text-accent transition-colors duration-200","aria-label":"Email"},be=w({__name:"AppFooter",setup(j){const{t:k}=C(),v=new Date().getFullYear();return(_,n)=>(a(),p("footer",ne,[t("div",ce,[t("p",le," © "+u(e(v))+" CKBlog — "+u(e(k)("footer.rights")),1),t("div",re,[t("a",ie,[s(e(O),{class:"w-5 h-5"})]),t("a",de,[s(e(q),{class:"w-5 h-5"})]),t("a",he,[s(e(E),{class:"w-5 h-5"})])])])]))}});export{_e as A,be as _};
