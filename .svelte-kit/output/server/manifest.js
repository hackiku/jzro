export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["APP.gif","Python-logo-notext.svg","assets/WhatsApp.svg","assets/dangerous-go-alone.png","assets/figma-logo.svg","assets/footer.svg","assets/openai-logo.svg","assets/orbit.svg","assets/streamlit-logo.svg","assets/svelte-logo.svg","clients/tommy-joiner-headshot.png","favicon.png","fonts/Neue-Regrade/Neue-Regrade-Bold-Italic.otf","fonts/Neue-Regrade/Neue-Regrade-Bold.otf","fonts/Neue-Regrade/Neue-Regrade-ExtraBold-Italic.otf","fonts/Neue-Regrade/Neue-Regrade-Light-Italic.otf","fonts/Neue-Regrade/Neue-Regrade-Light.otf","fonts/Neue-Regrade/Neue-Regrade-Medium-Italic.otf","fonts/Neue-Regrade/Neue-Regrade-Medium.otf","fonts/Neue-Regrade/Neue-Regrade-Regular-Italic.otf","fonts/Neue-Regrade/Neue-Regrade-Regular.otf","fonts/Neue-Regrade/Neue-Regrade-SemiBold-Italic.otf","fonts/Neue-Regrade/Neue-Regrade-Semibold.otf","fonts/Neue-Regrade/Neue-Regrade-Variable.ttf","fonts/jetbrains-mono/JetBrainsMono-Bold.woff2","fonts/jetbrains-mono/JetBrainsMono-BoldItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraBold.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraBoldItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraLight.woff2","fonts/jetbrains-mono/JetBrainsMono-ExtraLightItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Italic.woff2","fonts/jetbrains-mono/JetBrainsMono-Light.woff2","fonts/jetbrains-mono/JetBrainsMono-LightItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Medium.woff2","fonts/jetbrains-mono/JetBrainsMono-MediumItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Regular.woff2","fonts/jetbrains-mono/JetBrainsMono-SemiBold.woff2","fonts/jetbrains-mono/JetBrainsMono-SemiBoldItalic.woff2","fonts/jetbrains-mono/JetBrainsMono-Thin.woff2","fonts/jetbrains-mono/JetBrainsMono-ThinItalic.woff2","game/bananica.png","game/projectile-trajectory.svg","game/rocket.png","game/starkbananica_540x.png","game/trifun.jpg","grav/asteroid.png","grav/dangerous-go-alone.png","insight_marsweather_plot.png","memes/choppa.png","memes/fellow-engineers.png","memes/hello-friend.png","memes/morty.png","memes/naca1.png","memes/rocket.png","pipewriter/27s4x.gif","pipewriter/27s4x.mov","pipewriter/27s4x_high_quality.gif","pipewriter/app-demo.gif","pipewriter/app-demo.webm","pipewriter/app-ok.mov","pipewriter/app-quickdemo.mov","pipewriter/app-quickdemo_15s.mov","pipewriter/app-quickdemo_clipped.mov","portfolio/awwards-honors-badge.png","portfolio/flowmyfigma.png","portfolio/headshots/devon-price.png","portfolio/headshots/hantz-fevry.png","portfolio/headshots/heasdhot-placeholder.png","portfolio/headshots/jameson-days.png","portfolio/headshots/tommy-joiner.png","portfolio/logos/highfive-logo.svg","portfolio/logos/lenovo-logo-white.svg","portfolio/logos/lenovo-logo.svg","portfolio/logos/linguado-logo-square.jpg","portfolio/logos/linguado-logo.jpg","portfolio/logos/redocly-logo-white.svg","portfolio/logos/redocly-logo.svg","portfolio/logos/stoovo-logo-GRAY.svg","portfolio/logos/stoovo-logo.svg","portfolio/logos/uploadcare-logo-GRAY.svg","portfolio/logos/uploadcare-logo.svg","portfolio/mars-weather-portfolio.png","portfolio/omicron-hero.png","portfolio/omicron-mood.png","portfolio/omicron-ui.png","portfolio/pipistrel-portfolio.png","portfolio/tommy-joiner-headshot.png","portfolio/tool-icons/docker.svg","portfolio/tool-icons/docs.svg","portfolio/tool-icons/figma.svg","portfolio/tool-icons/onshape-vector-logo-2022.svg","portfolio/tool-icons/onshape.svg","portfolio/tool-icons/openai.svg","portfolio/tool-icons/streamlit.svg","portfolio/tool-icons/svelte.svg","portfolio/tool-icons/whatsapp.svg","portfolio/uploadcare-flex.png","portfolio/uploadcare-speed-optimization.gdoc","portfolio/uploadcare-ui.png","portfolio/uploadcare-wire.png","portfolio/wordagents-logo.png","portfolio/wordagents-olive.png","portfolio/wordagents-ui.png","portfolio/wordagents-wire.png","ui/footer.svg","ui/instagram-icon.svg","ui/linkedin-icon-gray-round.svg","ui/linkedin-icon-round.svg","ui/linkedin-icon.svg","ui/mars-surface-1440-120.svg","ui/mars-surface-slender.svg","ui/mars-surface.svg","ui/mcrn.svg","ui/tiktok-icon-nobueno.svg","ui/tiktok-icon.svg","ui/ukraine.svg"]),
	mimeTypes: {".gif":"image/gif",".svg":"image/svg+xml",".png":"image/png",".otf":"font/otf",".ttf":"font/ttf",".woff2":"font/woff2",".jpg":"image/jpeg",".mov":"video/quicktime",".webm":"video/webm"},
	_: {
		client: {"start":"_app/immutable/entry/start.3iQJ_4No.js","app":"_app/immutable/entry/app.t4W11edk.js","imports":["_app/immutable/entry/start.3iQJ_4No.js","_app/immutable/chunks/entry.pUd8LigW.js","_app/immutable/chunks/scheduler.SCxX1cnP.js","_app/immutable/chunks/index.2ydmFB_x.js","_app/immutable/entry/app.t4W11edk.js","_app/immutable/chunks/preload-helper.0HuHagjb.js","_app/immutable/chunks/scheduler.SCxX1cnP.js","_app/immutable/chunks/index.9k4By8bG.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
