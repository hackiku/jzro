function r(n,o){const i={},s={},u={$$scope:1};let f=n.length;for(;f--;){const c=n[f],e=o[f];if(e){for(const t in c)t in e||(s[t]=1);for(const t in e)u[t]||(i[t]=e[t],u[t]=1);n[f]=e}else for(const t in c)u[t]=1}for(const c in s)c in i||(i[c]=void 0);return i}function a(n){return typeof n=="object"&&n!==null?n:{}}function d(n){const o=n-1;return o*o*o+1}export{a,d as c,r as g};
