

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/menu/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.B_rCakq-.js","_app/immutable/chunks/scheduler.Cuf8PCcB.js","_app/immutable/chunks/index.j8JaKyCh.js"];
export const stylesheets = ["_app/immutable/assets/app.CZov3o6O.css"];
export const fonts = [];
