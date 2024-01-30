export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Python-logo-notext.svg","assets/dangerous-go-alone.png","assets/figma-logo.svg","assets/footer.svg","assets/openai-logo.svg","assets/orbit.svg","assets/streamlit-logo.svg","assets/svelte-logo.svg","clients/tommy-joiner-headshot.png","favicon.png","fonts/Aeonik-Air.ttf","fonts/Aeonik-AirItalic.ttf","fonts/Aeonik-Black.ttf","fonts/Aeonik-BlackItalic.ttf","fonts/Aeonik-Bold.ttf","fonts/Aeonik-BoldItalic.ttf","fonts/Aeonik-Light.ttf","fonts/Aeonik-LightItalic.ttf","fonts/Aeonik-Medium.ttf","fonts/Aeonik-MediumItalic.ttf","fonts/Aeonik-Regular.ttf","fonts/Aeonik-RegularItalic.ttf","fonts/Aeonik-Thin.ttf","fonts/Aeonik-ThinItalic.ttf","fonts/Aeonik_OVERVIEW-Medium.ttf","fonts/Aeonik_OVERVIEW-Regular.ttf","fonts/jetbrains-mono/JetBrainsMono-Bold.woff2","fonts/jetbrains-mono/JetBrainsMono-BoldItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraBold.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraBoldItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraLight.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraLightItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Italic.woff2","fonts/jetbrains-mono/JetBrainsMono-Light.woff2","fonts/jetbrains-mono/JetBrainsMono-LightItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Medium.woff2","fonts/jetbrains-mono/JetBrainsMono-MediumItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Regular.woff2","fonts/jetbrains-mono/JetBrainsMono-SemiBold.woff2","fonts/jetbrains-mono/JetBrainsMono-SemiBoldItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Thin.woff2","fonts/jetbrains-mono/JetBrainsMono-ThinItalic.woff2","insight_marsweather_plot.png","portfolio/mars-weather-portfolio.png","portfolio/pipistrel-portfolio.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".ttf":"font/ttf",".woff2":"font/woff2"},
	_: {
		client: {"start":"_app/immutable/entry/start.h9wynn9l.js","app":"_app/immutable/entry/app.zPnFZe7z.js","imports":["_app/immutable/entry/start.h9wynn9l.js","_app/immutable/chunks/entry.oZ2ug5TZ.js","_app/immutable/chunks/scheduler.gJYzTwKr.js","_app/immutable/chunks/index.uCXBm10w.js","_app/immutable/entry/app.zPnFZe7z.js","_app/immutable/chunks/scheduler.gJYzTwKr.js","_app/immutable/chunks/index.TqDRFHNP.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
