import{_ as ut}from"../chunks/preload-helper.0HuHagjb.js";import{s as dt,e as d,a as E,b as at,t as H,d as f,f as y,c as P,h as lt,i as _,g as Y,j as L,l as nt,k as t,m as V,n as ct,o as r,q as K,r as ft,B as ht,v as mt,p as pt}from"../chunks/scheduler.jcpPxS8_.js";import{S as vt,i as gt,c as _t,a as wt,m as bt,t as xt,b as yt,d as kt}from"../chunks/index.ICE1Y40O.js";import{g as J}from"../chunks/index.FSCrshNh.js";import{P as Ct}from"../chunks/Planet.PJvkcowI.js";function ot(p){let s,a,n,i,v,l,c="🫀📚",b,e,o="Restart →",h,M;return{c(){s=d("div"),a=d("div"),n=d("p"),i=H(it),v=E(),l=d("p"),l.textContent=c,b=E(),e=d("a"),e.textContent=o,this.h()},l(w){s=f(w,"DIV",{class:!0,style:!0});var x=y(s);a=f(x,"DIV",{class:!0});var C=y(a);n=f(C,"P",{class:!0});var S=y(n);i=L(S,it),S.forEach(_),v=P(C),l=f(C,"P",{class:!0,"data-svelte-h":!0}),Y(l)!=="svelte-52hpva"&&(l.textContent=c),b=P(C),e=f(C,"A",{href:!0,onclick:!0,class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-hqi6jw"&&(e.textContent=o),C.forEach(_),x.forEach(_),this.h()},h(){t(n,"class","text-center text-white text-xl mb-6"),t(l,"class","text-4xl text center"),t(e,"href","javascript:void(0);"),t(e,"onclick","window.location.reload();"),t(e,"class","text-[#F4191D] hover:text-red-700 mt-4 inline-block cursor-pointer"),t(a,"class","flex flex-col text-center mb-4"),t(s,"class","fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent p-4 rounded-2xl shadow-lg border-2"),V(s,"border-color","#F4191D")},m(w,x){ct(w,s,x),r(s,a),r(a,n),r(n,i),r(a,v),r(a,l),r(a,b),r(a,e),h||(M=K(e,"click",restartGame),h=!0)},p:pt,d(w){w&&_(s),h=!1,M()}}}function Et(p){let s,a,n,i,v,l,c,b,e,o,h,M,w,x,C="💥",S,I,$,W,T,R,z,A,k,F,D,Q,G,j,U,Z;h=new Ct({props:{id:"work",color:"#F4191D",label:"Jao Bre"}});let m=p[2]&&ot();return{c(){s=d("section"),a=d("div"),n=d("img"),v=E(),l=at("svg"),c=at("path"),b=E(),e=d("div"),o=d("div"),_t(h.$$.fragment),M=E(),w=d("div"),x=d("button"),x.textContent=C,S=E(),I=d("div"),$=d("p"),W=H("v = "),T=d("span"),R=H(p[0]),z=H(" m/s"),A=E(),k=d("input"),F=E(),D=d("img"),G=E(),m&&m.c(),this.h()},l(g){s=f(g,"SECTION",{class:!0});var u=y(s);a=f(u,"DIV",{class:!0});var O=y(a);n=f(O,"IMG",{src:!0,alt:!0,class:!0}),v=P(O),l=lt(O,"svg",{class:!0,width:!0,height:!0,style:!0,fill:!0,xmlns:!0});var tt=y(l);c=lt(tt,"path",{d:!0,fill:!0,stroke:!0,"stroke-width":!0,"stroke-dasharray":!0}),y(c).forEach(_),tt.forEach(_),O.forEach(_),b=P(u),e=f(u,"DIV",{});var et=y(e);o=f(et,"DIV",{class:!0,style:!0,width:!0,height:!0});var st=y(o);wt(h.$$.fragment,st),st.forEach(_),et.forEach(_),M=P(u),w=f(u,"DIV",{class:!0});var q=y(w);x=f(q,"BUTTON",{class:!0,"data-svelte-h":!0}),Y(x)!=="svelte-156r4tt"&&(x.textContent=C),S=P(q),I=f(q,"DIV",{class:!0});var B=y(I);$=f(B,"P",{});var N=y($);W=L(N,"v = "),T=f(N,"SPAN",{class:!0});var rt=y(T);R=L(rt,p[0]),rt.forEach(_),z=L(N," m/s"),N.forEach(_),A=P(B),k=f(B,"INPUT",{type:!0,min:!0,max:!0,class:!0,id:!0}),B.forEach(_),q.forEach(_),F=P(u),D=f(u,"IMG",{src:!0,alt:!0,class:!0}),G=P(u),m&&m.l(u),u.forEach(_),this.h()},h(){nt(n.src,i="game/bananica.png")||t(n,"src",i),t(n,"alt","rocket"),t(n,"class","rocket svelte-1jnt8wo"),t(c,"d",p[1]),t(c,"fill","none"),t(c,"stroke","#ff3d00"),t(c,"stroke-width","0.5"),t(c,"stroke-dasharray","10,10"),t(l,"class","absolute"),t(l,"width","100vw"),t(l,"height","100vh"),V(l,"position","absolute"),V(l,"bottom","20vh"),V(l,"left","5vw"),t(l,"fill","none"),t(l,"xmlns","http://www.w3.org/2000/svg"),t(a,"class","relative w-full h-full"),t(o,"class","absolute"),V(o,"right","10vw"),V(o,"top","10vh"),t(o,"width","100"),t(o,"height","100"),t(x,"class","text-5xl mr-6 hover:bg-red-500 rounded-full"),t(T,"class","velocity svelte-1jnt8wo"),t(k,"type","range"),t(k,"min","1"),t(k,"max","100"),k.value=p[0],t(k,"class","slider w-full"),t(k,"id","particleNumber"),t(I,"class","relative space-between-12 flex flex-col justify-center group hover:opacity-100 transition-opacity"),t(w,"class","z-50 fixed p-6 bottom-6 rounded-full backdrop-blur-md flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2"),nt(D.src,Q="assets/footer.svg")||t(D,"src",Q),t(D,"alt",""),t(D,"class","fixed inset-x-0 bottom-0 w-full z-0 mb-0"),t(s,"class","flex-col items-center justify-start h-screen")},m(g,u){ct(g,s,u),r(s,a),r(a,n),r(a,v),r(a,l),r(l,c),r(s,b),r(s,e),r(e,o),bt(h,o,null),r(s,M),r(s,w),r(w,x),r(w,S),r(w,I),r(I,$),r($,W),r($,T),r(T,R),r($,z),r(I,A),r(I,k),r(s,F),r(s,D),r(s,G),m&&m.m(s,null),j=!0,U||(Z=[K(x,"click",p[3]),K(k,"input",p[4])],U=!0)},p(g,[u]){(!j||u&2)&&t(c,"d",g[1]),(!j||u&1)&&ft(R,g[0]),(!j||u&1)&&(k.value=g[0]),g[2]?m?m.p(g,u):(m=ot(),m.c(),m.m(s,null)):m&&(m.d(1),m=null)},i(g){j||(xt(h.$$.fragment,g),j=!0)},o(g){yt(h.$$.fragment,g),j=!1},d(g){g&&_(s),kt(h),m&&m.d(),U=!1,ht(Z)}}}let it="Srecan Svetski Trifun i hvala, uvek, na tough love";function X(p,s,a){const n=s*.01,i=a*1,v=p/50*a*.8,l=p/50*s*1.6,c=i-v,b=n+l;return`M${n},${i} C${n+b/4},${c} ${n+3*b/4},${c} ${b},${i}`}function Pt(p,s,a){let n,i=43,v="",l=!1;mt(async()=>{if(typeof window<"u"){n=(await ut(()=>import("../chunks/MotionPathPlugin.GyEBaqZg.js"),__vite__mapDeps([]),import.meta.url)).MotionPathPlugin,J.registerPlugin(n);const e=window.innerWidth,o=window.innerHeight;a(1,v=X(i,e,o)),window.addEventListener("resize",()=>{a(1,v=X(i,window.innerWidth,window.innerHeight))})}});function c(){const e=document.createElement("img");e.src="game/bananica.png",e.classList.add("rocket"),e.style.position="absolute",e.style.width="9em",e.style.top="80vh",e.style.left="5vw",document.body.appendChild(e),J.to(e,{duration:80/i,ease:"power1.inOut",motionPath:{path:v,align:"self",alignOrigin:[0,0]},onUpdate:()=>{const o=e.getBoundingClientRect(),h=document.querySelector("svg circle").getBoundingClientRect();o.right>h.left&&o.left<h.right&&o.bottom>h.top&&o.top<h.bottom&&(a(2,l=!0),J.killTweensOf(e),e.remove())},onComplete:()=>{l||e.remove()}})}const b=e=>a(0,i=e.target.value);return p.$$.update=()=>{p.$$.dirty&1&&i&&a(1,v=X(i,window.innerWidth,window.innerHeight))},[i,v,l,c,b]}class St extends vt{constructor(s){super(),gt(this,s,Pt,Et,dt,{})}}export{St as component};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
