import{B as $,p as _,K as y,f as S,i as E,L as O,M as w,N as b,O as p,P as B,Q as C,R as x,S as I,T as L,U as M,V as N,W as P}from"./scheduler.jcpPxS8_.js";const u=new Set;let f;function T(){f={r:0,c:[],p:f}}function W(){f.r||$(f.c),f=f.p}function R(t,e){t&&t.i&&(u.delete(t),t.i(e))}function z(t,e,n,a){if(t&&t.o){if(u.has(t))return;u.add(t),f.c.push(()=>{u.delete(t),a&&(n&&t.d(1),a())}),t.o(e)}else a&&a()}function A(t){t&&t.c()}function D(t,e){t&&t.l(e)}function U(t,e,n){const{fragment:a,after_update:i}=t.$$;a&&a.m(e,n),p(()=>{const d=t.$$.on_mount.map(I).filter(w);t.$$.on_destroy?t.$$.on_destroy.push(...d):$(d),t.$$.on_mount=[]}),i.forEach(p)}function V(t,e){const n=t.$$;n.fragment!==null&&(B(n.after_update),$(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function j(t,e){t.$$.dirty[0]===-1&&(L.push(t),M(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function F(t,e,n,a,i,d,c=null,v=[-1]){const o=C;x(t);const s=t.$$={fragment:null,ctx:[],props:d,update:_,not_equal:i,bound:y(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:y(),dirty:v,skip_bound:!1,root:e.target||o.$$.root};c&&c(s.root);let l=!1;if(s.ctx=n?n(t,e.props||{},(r,h,...g)=>{const m=g.length?g[0]:h;return s.ctx&&i(s.ctx[r],s.ctx[r]=m)&&(!s.skip_bound&&s.bound[r]&&s.bound[r](m),l&&j(t,r)),h}):[],s.update(),l=!0,$(s.before_update),s.fragment=a?a(s.ctx):!1,e.target){if(e.hydrate){N();const r=S(e.target);s.fragment&&s.fragment.l(r),r.forEach(E)}else s.fragment&&s.fragment.c();e.intro&&R(t.$$.fragment),U(t,e.target,e.anchor),P(),O()}x(o)}class G{$$=void 0;$$set=void 0;$destroy(){V(this,1),this.$destroy=_}$on(e,n){if(!w(n))return _;const a=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return a.push(n),()=>{const i=a.indexOf(n);i!==-1&&a.splice(i,1)}}$set(e){this.$$set&&!b(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const K="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(K);export{G as S,D as a,z as b,A as c,V as d,W as e,T as g,F as i,U as m,R as t};
