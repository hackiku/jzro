

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.2B5oV5Dn.js","_app/immutable/chunks/scheduler.gJYzTwKr.js","_app/immutable/chunks/index.TqDRFHNP.js"];
export const stylesheets = ["_app/immutable/assets/0.PO9DhOSi.css"];
export const fonts = ["_app/immutable/assets/Aeonik-Regular.mkad02YY.ttf","_app/immutable/assets/Aeonik-Bold.nhgb6yHA.ttf"];
