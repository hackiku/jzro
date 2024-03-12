

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/cta/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.l1Fu9XvM.js","_app/immutable/chunks/scheduler.FpOT9Oc1.js","_app/immutable/chunks/index.XmOpoheg.js","_app/immutable/chunks/Nav.i2Np-foP.js"];
export const stylesheets = [];
export const fonts = [];
