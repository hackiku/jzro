import{s as S,a as $,D as _,c as q,n as f,p,i as c,u as C,v as I,e as d,t as v,d as h,f as L,j as g,k as u,o as y,q as b,B as A,l as x,g as B}from"../chunks/scheduler.jcpPxS8_.js";import{S as N,i as T,c as D,a as E,m as P,t as j,b as F,d as G}from"../chunks/index.ICE1Y40O.js";import{e as w}from"../chunks/each.-oqiv04n.js";function M(o,t,r){const s=o.slice();return s[5]=t[r],s}function k(o){let t,r,s=o[5].id+"",n,a,e;function i(){return o[4](o[5])}return{c(){t=d("span"),r=v("Hover over me to see meme /"),n=v(s),this.h()},l(l){t=h(l,"SPAN",{class:!0});var m=L(t);r=g(m,"Hover over me to see meme /"),n=g(m,s),m.forEach(c),this.h()},h(){u(t,"class","meme-hover-text svelte-14ay1lt")},m(l,m){f(l,t,m),y(t,r),y(t,n),a||(e=[b(t,"mouseenter",i),b(t,"mouseleave",o[3])],a=!0)},p(l,m){o=l},d(l){l&&c(t),a=!1,A(e)}}}function H(o){let t,r;return{c(){t=d("img"),this.h()},l(s){t=h(s,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){x(t.src,r=o[0].url)||u(t,"src",r),u(t,"alt","Selected Meme"),u(t,"class","tilted-image svelte-14ay1lt")},m(s,n){f(s,t,n)},p(s,n){n&1&&!x(t.src,r=s[0].url)&&u(t,"src",r)},d(s){s&&c(t)}}}function O(o){let t,r,s=w(o[1]),n=[];for(let e=0;e<s.length;e+=1)n[e]=k(M(o,s,e));let a=o[0]&&H(o);return{c(){for(let e=0;e<n.length;e+=1)n[e].c();t=$(),a&&a.c(),r=_()},l(e){for(let i=0;i<n.length;i+=1)n[i].l(e);t=q(e),a&&a.l(e),r=_()},m(e,i){for(let l=0;l<n.length;l+=1)n[l]&&n[l].m(e,i);f(e,t,i),a&&a.m(e,i),f(e,r,i)},p(e,[i]){if(i&14){s=w(e[1]);let l;for(l=0;l<s.length;l+=1){const m=M(e,s,l);n[l]?n[l].p(m,i):(n[l]=k(m),n[l].c(),n[l].m(t.parentNode,t))}for(;l<n.length;l+=1)n[l].d(1);n.length=s.length}e[0]?a?a.p(e,i):(a=H(e),a.c(),a.m(r.parentNode,r)):a&&(a.d(1),a=null)},i:p,o:p,d(e){e&&(c(t),c(r)),C(n,e),a&&a.d(e)}}}function R(o,t,r){let{selectedMeme:s=null}=t,n=[{id:"choppa",url:"memes/choppa.png"},{id:"morty",url:"memes/morty.png"},{id:"fellow-engineers",url:"memes/fellow-engineers.png"}];function a(l){r(0,s=l)}function e(){r(0,s=null)}I(()=>{});const i=l=>a(l);return o.$$set=l=>{"selectedMeme"in l&&r(0,s=l.selectedMeme)},[s,n,a,e,i]}class z extends N{constructor(t){super(),T(this,t,R,O,S,{selectedMeme:0})}}function J(o){let t,r,s,n='<div class="flex flex-wrap items-center"><div class="w-full md:w-1/2 p-4"><h2 class="text-xl mb-3">Building apps for <span>engineers</span> that try to be smart as a DART 🛰️ (I wish) and more fun than Fortran.</h2> <p class="text-md mb-4 font-mono text-blue-700">Hire me to code →</p></div> <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"></div></div>',a;return t=new z({}),{c(){D(t.$$.fragment),r=$(),s=d("section"),s.innerHTML=n,this.h()},l(e){E(t.$$.fragment,e),r=q(e),s=h(e,"SECTION",{class:!0,"data-svelte-h":!0}),B(s)!=="svelte-15ypc1q"&&(s.innerHTML=n),this.h()},h(){u(s,"class","mt-20 py-8 px-8 md:px-8 max-w-3xl mx-auto")},m(e,i){P(t,e,i),f(e,r,i),f(e,s,i),a=!0},p,i(e){a||(j(t.$$.fragment,e),a=!0)},o(e){F(t.$$.fragment,e),a=!1},d(e){e&&(c(r),c(s)),G(t,e)}}}class V extends N{constructor(t){super(),T(this,t,null,J,S,{})}}export{V as component};