

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/boing/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.B_dQleC6.js","_app/immutable/chunks/preload-helper.0HuHagjb.js","_app/immutable/chunks/scheduler.FEohBkYG.js","_app/immutable/chunks/index.LfqltaLq.js","_app/immutable/chunks/index.FSCrshNh.js"];
export const stylesheets = ["_app/immutable/assets/3.jKG65RMd.css"];
export const fonts = [];
