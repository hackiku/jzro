// src/lib/content/work/data/types.ts

export interface Tool {
	name: string;
	icon: string;
	url?: string;
}

export const tools: Record<string, Tool> = {
	figma: {
		name: "Figma",
		icon: "/work/tool-icons/figma.svg",
		url: "https://figma.com"
	},
	svelte: {
		name: "SvelteKit",
		icon: "/work/tool-icons/svelte.svg",
		url: "https://kit.svelte.dev"
	},
	python: {
		name: "Python",
		icon: "/work/tool-icons/python.svg"
	},
	onshape: {
		name: "Onshape",
		icon: "/work/tool-icons/onshape.svg",
		url: "https://onshape.com"
	},
	docker: {
		name: "Docker",
		icon: "/work/tool-icons/docker.svg"
	}
};

export interface Project {
	id: string;
	title: string;
	description: string;
	categories: string[];
	image: string;
	keyFeatures: string[];
	tools: string[];
	liveUrl?: string;
	githubUrl?: string;
	assets?: {
		screenshots: string[];
		videos?: string[];
	};
}