export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["APP.gif","Python-logo-notext.svg","assets/WhatsApp.svg","assets/dangerous-go-alone.png","assets/figma-logo.svg","assets/footer.svg","assets/openai-logo.svg","assets/orbit.svg","assets/streamlit-logo.svg","assets/svelte-logo.svg","clients/tommy-joiner-headshot.png","favicon.png","game/bananica.png","game/projectile-trajectory.svg","game/rocket.png","game/starkbananica_540x.png","game/trifun.jpg","grav/asteroid.png","grav/dangerous-go-alone.png","insight_marsweather_plot.png","memes/choppa.png","memes/fellow-engineers.png","memes/hello-friend.png","memes/morty.png","memes/naca1.png","memes/rocket.png","models/cat-transformed.glb","models/cat.glb","models/ribs-transformed.glb","models/ribs.gltf","models/virus-transformed.glb","models/virus.gltf","pipewriter/27s4x.gif","pipewriter/27s4x.mov","pipewriter/27s4x_high_quality.gif","pipewriter/app-demo.gif","pipewriter/app-demo.webm","pipewriter/app-ok.mov","pipewriter/app-quickdemo.mov","pipewriter/app-quickdemo_15s.mov","pipewriter/app-quickdemo_clipped.mov","portfolio/awwards-honors-badge.png","portfolio/flowmyfigma.png","portfolio/headshots/devon-price.png","portfolio/headshots/hantz-fevry.png","portfolio/headshots/heasdhot-placeholder.png","portfolio/headshots/jameson-days.png","portfolio/headshots/tommy-joiner.png","portfolio/logos/highfive-logo.svg","portfolio/logos/lenovo-logo-white.svg","portfolio/logos/lenovo-logo.svg","portfolio/logos/linguado-logo-square.jpg","portfolio/logos/linguado-logo.jpg","portfolio/logos/redocly-logo-white.svg","portfolio/logos/redocly-logo.svg","portfolio/logos/stoovo-logo-GRAY.svg","portfolio/logos/stoovo-logo.svg","portfolio/logos/uploadcare-logo-GRAY.svg","portfolio/logos/uploadcare-logo.svg","portfolio/mars-weather-portfolio.png","portfolio/omicron-hero.png","portfolio/omicron-mood.png","portfolio/omicron-ui.png","portfolio/onshape-darkmode.png","portfolio/pipistrel-portfolio.png","portfolio/rocket-engine.png","portfolio/tommy-joiner-headshot.png","portfolio/tool-icons/docker.svg","portfolio/tool-icons/docs.svg","portfolio/tool-icons/figma.svg","portfolio/tool-icons/onshape-vector-logo-2022.svg","portfolio/tool-icons/onshape.svg","portfolio/tool-icons/openai.svg","portfolio/tool-icons/python.svg","portfolio/tool-icons/rpa.png","portfolio/tool-icons/streamlit.svg","portfolio/tool-icons/svelte.svg","portfolio/tool-icons/whatsapp.svg","portfolio/uploadcare-flex.png","portfolio/uploadcare-speed-optimization.gdoc","portfolio/uploadcare-ui.png","portfolio/uploadcare-wire.png","portfolio/wordagents-logo.png","portfolio/wordagents-olive.png","portfolio/wordagents-ui.png","portfolio/wordagents-wire.png","ui/footer.svg","ui/instagram-icon.svg","ui/linkedin-icon-gray-round.svg","ui/linkedin-icon-round.svg","ui/linkedin-icon.svg","ui/mars-surface-1440-120.svg","ui/mars-surface-slender.svg","ui/mars-surface.svg","ui/mcrn.svg","ui/tiktok-icon-nobueno.svg","ui/tiktok-icon.svg","ui/ukraine.svg"]),
	mimeTypes: {".gif":"image/gif",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".glb":"model/gltf-binary",".gltf":"model/gltf+json",".mov":"video/quicktime",".webm":"video/webm"},
	_: {
		client: {"start":"_app/immutable/entry/start.CD4SRtdO.js","app":"_app/immutable/entry/app.BHztJZCq.js","imports":["_app/immutable/entry/start.CD4SRtdO.js","_app/immutable/chunks/entry.mj3lnPLV.js","_app/immutable/chunks/scheduler.Cuf8PCcB.js","_app/immutable/chunks/index.DnowDrOX.js","_app/immutable/entry/app.BHztJZCq.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.Cuf8PCcB.js","_app/immutable/chunks/index.j8JaKyCh.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(random)/boing",
				pattern: /^\/boing\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/chute-repack",
				pattern: /^\/chute-repack\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/chute-repack/gui",
				pattern: /^\/chute-repack\/gui\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/chute-repack/repacks/phasefour.io",
				pattern: /^\/chute-repack\/repacks\/phasefour\.io\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/chute-repack/repacks/unbody",
				pattern: /^\/chute-repack\/repacks\/unbody\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/menu",
				pattern: /^\/menu\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/work",
				pattern: /^\/work\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/work/[projects]",
				pattern: /^\/work\/([^/]+?)\/?$/,
				params: [{"name":"projects","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,5,], errors: [1,,], leaf: 14 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
