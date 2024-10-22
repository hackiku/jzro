// src/lib/content/work/data/types.ts

export interface Tool {
	name: string;
	icon: string;
	url?: string;
}

export interface ProjectContent {
	problem?: string;
	solution?: string;
	results?: string;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	longDescription: string;
	categories: string[];
	tools: string[];
	problem?: string;
	solution?: string;
	results?: string;
	keyFeatures: string[];
	liveUrl?: string;
	githubUrl?: string;
}

// Default fallbacks for all optional fields
export const DEFAULT_PROJECT: Partial<Project> = {
	problem: "Houston, we have a problem that needs solving...",
	solution: "Through careful engineering and design thinking...",
	results: "The project achieved significant improvements...",
	description: "A groundbreaking project pushing the boundaries of aerospace technology.",
	categories: ["Aerospace", "Development"],
	tools: ["figma", "svelte"],
	liveUrl: undefined,
	githubUrl: undefined
};


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

