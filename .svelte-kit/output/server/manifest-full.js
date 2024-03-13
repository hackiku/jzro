export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["APP.gif","Python-logo-notext.svg","assets/WhatsApp.svg","assets/dangerous-go-alone.png","assets/figma-logo.svg","assets/footer.svg","assets/openai-logo.svg","assets/orbit.svg","assets/streamlit-logo.svg","assets/svelte-logo.svg","clients/tommy-joiner-headshot.png","favicon.png","fonts/Aeonik-Air.ttf","fonts/Aeonik-AirItalic.ttf","fonts/Aeonik-Black.ttf","fonts/Aeonik-BlackItalic.ttf","fonts/Aeonik-Bold.ttf","fonts/Aeonik-BoldItalic.ttf","fonts/Aeonik-Light.ttf","fonts/Aeonik-LightItalic.ttf","fonts/Aeonik-Medium.ttf","fonts/Aeonik-MediumItalic.ttf","fonts/Aeonik-Regular.ttf","fonts/Aeonik-RegularItalic.ttf","fonts/Aeonik-Thin.ttf","fonts/Aeonik-ThinItalic.ttf","fonts/Aeonik_OVERVIEW-Medium.ttf","fonts/Aeonik_OVERVIEW-Regular.ttf","fonts/jetbrains-mono/JetBrainsMono-Bold.woff2","fonts/jetbrains-mono/JetBrainsMono-BoldItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraBold.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraBoldItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraLight.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraLightItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Italic.woff2","fonts/jetbrains-mono/JetBrainsMono-Light.woff2","fonts/jetbrains-mono/JetBrainsMono-LightItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Medium.woff2","fonts/jetbrains-mono/JetBrainsMono-MediumItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Regular.woff2","fonts/jetbrains-mono/JetBrainsMono-SemiBold.woff2","fonts/jetbrains-mono/JetBrainsMono-SemiBoldItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Thin.woff2","fonts/jetbrains-mono/JetBrainsMono-ThinItalic.woff2","game/bananica.png","game/projectile-trajectory.svg","game/rocket.png","game/starkbananica_540x.png","game/trifun.jpg","insight_marsweather_plot.png","memes/choppa.png","memes/fellow-engineers.png","memes/hello-friend.png","memes/morty.png","memes/naca1.png","memes/rocket.png","pipewriter/27s4x.gif","pipewriter/27s4x.mov","pipewriter/27s4x_high_quality.gif","pipewriter/app-demo.gif","pipewriter/app-demo.webm","pipewriter/app-ok.mov","pipewriter/app-quickdemo.mov","pipewriter/app-quickdemo_15s.mov","pipewriter/app-quickdemo_clipped.mov","portfolio/logos/highfive-logo.svg","portfolio/logos/lenovo-logo-white.svg","portfolio/logos/lenovo-logo.svg","portfolio/logos/linguado-logo-square.jpg","portfolio/logos/linguado-logo.jpg","portfolio/logos/redocly-logo-white.svg","portfolio/logos/redocly-logo.svg","portfolio/logos/stoovo-logo-GRAY.svg","portfolio/logos/stoovo-logo.svg","portfolio/logos/uploadcare-logo-GRAY.svg","portfolio/logos/uploadcare-logo.svg","portfolio/mars-weather-portfolio.png","portfolio/person_placeholder.png","portfolio/pipistrel-portfolio.png","portfolio/tommy-joiner-headshot.png","portfolio/uploadcare-speed-optimization.gdoc","portfolio/uploadcare-ui.png","portfolio/uploadcare-wire.png","portfolio/wordagents-logo.png","portfolio/wordagents-ui.png","portfolio/wordagents-wire.png"]),
	mimeTypes: {".gif":"image/gif",".svg":"image/svg+xml",".png":"image/png",".ttf":"font/ttf",".woff2":"font/woff2",".jpg":"image/jpeg",".mov":"video/quicktime",".webm":"video/webm"},
	_: {
		client: {"start":"_app/immutable/entry/start.OVVri7-5.js","app":"_app/immutable/entry/app.mmp9fsFd.js","imports":["_app/immutable/entry/start.OVVri7-5.js","_app/immutable/chunks/entry.Bs79L2qW.js","_app/immutable/chunks/scheduler.jcpPxS8_.js","_app/immutable/chunks/index.Ifvxqu1F.js","_app/immutable/entry/app.mmp9fsFd.js","_app/immutable/chunks/preload-helper.0HuHagjb.js","_app/immutable/chunks/scheduler.jcpPxS8_.js","_app/immutable/chunks/index.ICE1Y40O.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/boing-relative-dashed-ok",
				pattern: /^\/boing-relative-dashed-ok\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/boing",
				pattern: /^\/boing\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/cta",
				pattern: /^\/cta\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/fiddle",
				pattern: /^\/fiddle\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/hero",
				pattern: /^\/hero\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/mars-metar",
				pattern: /^\/mars-metar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
