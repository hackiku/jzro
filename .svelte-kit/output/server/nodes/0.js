

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.-D80UXdn.js","_app/immutable/chunks/scheduler.FEohBkYG.js","_app/immutable/chunks/index.LfqltaLq.js"];
export const stylesheets = ["_app/immutable/assets/0.VQeztr8W.css"];
export const fonts = ["_app/immutable/assets/Aeonik-Regular.mkad02YY.ttf","_app/immutable/assets/Aeonik-Bold.nhgb6yHA.ttf"];
