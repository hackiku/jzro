

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/fiddle/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.0RKAXPHT.js","_app/immutable/chunks/scheduler.SCxX1cnP.js","_app/immutable/chunks/index.9k4By8bG.js","_app/immutable/chunks/each.-oqiv04n.js"];
export const stylesheets = ["_app/immutable/assets/6.-dFvInif.css"];
export const fonts = [];
