function C(){}function P(t,n){for(const e in n)t[e]=n[e];return t}function B(t){return t()}function Q(){return Object.create(null)}function D(t){t.forEach(B)}function R(t){return typeof t=="function"}function V(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let h;function X(t,n){return t===n?!0:(h||(h=document.createElement("a")),h.href=n,t===h.href)}function Y(t){return Object.keys(t).length===0}function M(t,...n){if(t==null){for(const i of n)i(void 0);return C}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function Z(t,n,e){t.$$.on_destroy.push(M(n,e))}function $(t,n,e,i){if(t){const r=N(t,n,e,i);return t[0](r)}}function N(t,n,e,i){return t[1]&&i?P(e.ctx.slice(),t[1](i(n))):e.ctx}function tt(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const s=[],c=Math.max(n.dirty.length,r.length);for(let u=0;u<c;u+=1)s[u]=n.dirty[u]|r[u];return s}return n.dirty|r}return n.dirty}function nt(t,n,e,i,r,s){if(r){const c=N(n,e,i,s);t.p(c,r)}}function et(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function it(t){return t??""}let p=!1;function rt(){p=!0}function ct(){p=!1}function O(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function T(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let o=0;o<n.length;o++){const a=n[o];a.claim_order!==void 0&&l.push(a)}n=l}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let l=0;l<n.length;l++){const o=n[l].claim_order,a=(r>0&&n[e[r]].claim_order<=o?r+1:O(1,r,q=>n[e[q]].claim_order,o))-1;i[l]=e[a]+1;const w=a+1;e[w]=l,r=Math.max(w,r)}const s=[],c=[];let u=n.length-1;for(let l=e[r]+1;l!=0;l=i[l-1]){for(s.push(n[l-1]);u>=l;u--)c.push(n[u]);u--}for(;u>=0;u--)c.push(n[u]);s.reverse(),c.sort((l,o)=>l.claim_order-o.claim_order);for(let l=0,o=0;l<c.length;l++){for(;o<s.length&&c[l].claim_order>=s[o].claim_order;)o++;const a=o<s.length?s[o]:null;t.insertBefore(c[l],a)}}function H(t,n){if(p){for(T(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function lt(t,n,e){p&&!e?H(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function ut(t){t.parentNode&&t.parentNode.removeChild(t)}function st(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function I(t){return document.createElement(t)}function L(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function v(t){return document.createTextNode(t)}function ot(){return v(" ")}function at(){return v("")}function ft(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function _t(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function dt(t){return t.dataset.svelteH}function ht(t){return Array.from(t.childNodes)}function z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function A(t,n,e,i,r=!1){z(t);const s=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const u=t[c];if(n(u)){const l=e(u);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),u}}for(let c=t.claim_info.last_index-1;c>=0;c--){const u=t[c];if(n(u)){const l=e(u);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,u}}return i()})();return s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,s}function j(t,n,e,i){return A(t,r=>r.nodeName===n,r=>{const s=[];for(let c=0;c<r.attributes.length;c++){const u=r.attributes[c];e[u.name]||s.push(u.name)}s.forEach(c=>r.removeAttribute(c))},()=>i(n))}function mt(t,n,e){return j(t,n,e,I)}function pt(t,n,e){return j(t,n,e,L)}function F(t,n){return A(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>v(n),!0)}function yt(t){return F(t," ")}function bt(t,n){n=""+n,t.data!==n&&(t.data=n)}function gt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function U(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function xt(t,n){return new t(n)}let m;function b(t){m=t}function y(){if(!m)throw new Error("Function called outside component initialization");return m}function vt(t){y().$$.on_mount.push(t)}function wt(t){y().$$.after_update.push(t)}function Et(t){y().$$.on_destroy.push(t)}function kt(){const t=y();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const s=U(n,e,{cancelable:i});return r.slice().forEach(c=>{c.call(t,s)}),!s.defaultPrevented}return!0}}const d=[],E=[];let _=[];const k=[],S=Promise.resolve();let x=!1;function W(){x||(x=!0,S.then(J))}function Nt(){return W(),S}function G(t){_.push(t)}const g=new Set;let f=0;function J(){if(f!==0)return;const t=m;do{try{for(;f<d.length;){const n=d[f];f++,b(n),K(n.$$)}}catch(n){throw d.length=0,f=0,n}for(b(null),d.length=0,f=0;E.length;)E.pop()();for(let n=0;n<_.length;n+=1){const e=_[n];g.has(e)||(g.add(e),e())}_.length=0}while(d.length);for(;k.length;)k.pop()();x=!1,g.clear(),b(t)}function K(t){if(t.fragment!==null){t.update(),D(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(G)}}function At(t){const n=[],e=[];_.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),_=n}export{Z as A,D as B,kt as C,at as D,wt as E,E as F,xt as G,Nt as H,it as I,Et as J,Q as K,J as L,R as M,Y as N,G as O,At as P,m as Q,b as R,B as S,d as T,W as U,rt as V,ct as W,ot as a,L as b,yt as c,mt as d,I as e,ht as f,dt as g,pt as h,ut as i,F as j,_t as k,X as l,gt as m,lt as n,H as o,C as p,ft as q,bt as r,V as s,v as t,st as u,vt as v,$ as w,nt as x,et as y,tt as z};