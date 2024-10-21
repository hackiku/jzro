

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/work/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.D-qcIJXT.js","_app/immutable/chunks/scheduler.Cuf8PCcB.js","_app/immutable/chunks/index.j8JaKyCh.js"];
export const stylesheets = ["_app/immutable/assets/app.CZov3o6O.css"];
export const fonts = [];
