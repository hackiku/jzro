import{s as E,e as b,t as _,a as x,d as f,f as d,j as g,i as p,c as S,n as l,o as h,x as v,p as $,y}from"../chunks/scheduler.FEohBkYG.js";import{S as j,i as q}from"../chunks/index.LfqltaLq.js";import{s as C}from"../chunks/entry.A9h8_a2d.js";const H=()=>{const s=C;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},P={subscribe(s){return H().page.subscribe(s)}};function k(s){let t,r=s[0].status+"",o,n,i,c=s[0].error?.message+"",u;return{c(){t=b("h1"),o=_(r),n=x(),i=b("p"),u=_(c)},l(e){t=f(e,"H1",{});var a=d(t);o=g(a,r),a.forEach(p),n=S(e),i=f(e,"P",{});var m=d(i);u=g(m,c),m.forEach(p)},m(e,a){l(e,t,a),h(t,o),l(e,n,a),l(e,i,a),h(i,u)},p(e,[a]){a&1&&r!==(r=e[0].status+"")&&v(o,r),a&1&&c!==(c=e[0].error?.message+"")&&v(u,c)},i:$,o:$,d(e){e&&(p(t),p(n),p(i))}}}function w(s,t,r){let o;return y(s,P,n=>r(0,o=n)),[o]}let D=class extends j{constructor(t){super(),q(this,t,w,k,E,{})}};export{D as component};