

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CeU9a7z5.js","_app/immutable/chunks/scheduler.jcpPxS8_.js","_app/immutable/chunks/index.ICE1Y40O.js"];
export const stylesheets = ["_app/immutable/assets/0.FAUuujKf.css"];
export const fonts = ["_app/immutable/assets/Aeonik-Regular.mkad02YY.ttf","_app/immutable/assets/Aeonik-Bold.nhgb6yHA.ttf"];
