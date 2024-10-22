// src/lib/content/work/data/workData.ts

import type { Project } from './types';

export const projects: Project[] = [
	{
		id: "6pack-avionics",
		title: "6pack Avionics",
		description: "An innovative digital avionics solution that brings modern UX principles to general aviation cockpits. Built for student pilots and flight schools.",
		categories: ["Product Design", "Aerospace", "Hardware"],
		image: "/work/pipistrel-portfolio.png", // fallback image
		keyFeatures: [
			"Modular PFD/MFD design",
			"E-learning integration",
			"Voice-activated checklists",
			"Student progress tracking",
			"Weather radar overlay",
			"Terrain awareness"
		],
		tools: ["figma", "python", "onshape"],
		liveUrl: "https://example.com/6pack",
		githubUrl: "https://github.com/yourusername/6pack",
		assets: {
			screenshots: [
				"/work/omicron-hero.png",
				"/work/omicron-ui.png",
				"/work/omicron-mood.png",
				"/work/onshape-darkmode.png"
			],
			videos: [
				"https://www.youtube.com/embed/dQw4w9WgXcQ" // placeholder
			]
		}
	},
	{
		id: "pipewriter",
		title: "Pipewriter",
		description: "A Figma-style wireframing tool that works directly in Google Docs. Built for technical writers and UX designers who live in documentation.",
		categories: ["SaaS", "Developer Tools"],
		image: "/work/mars-weather-portfolio.png",
		keyFeatures: [
			"Google Docs integration",
			"Component library",
			"Version control",
			"Team collaboration",
			"Export to Figma"
		],
		tools: ["figma", "svelte"],
		liveUrl: "https://pipewriter.io",
		githubUrl: "https://github.com/yourusername/pipewriter",
		assets: {
			screenshots: [
				"/work/uploadcare-ui.png",
				"/work/uploadcare-wire.png",
				"/work/wordagents-ui.png",
				"/work/wordagents-wire.png"
			]
		}
	},
	{
		id: "mars-metar",
		title: "Mars METAR",
		description: "A weather reporting system for Mars using Perseverance rover data, formatted in aviation-standard METAR format. Because space traffic needs weather reports too.",
		categories: ["Space", "Data Viz"],
		image: "/work/rocket-engine.png",
		keyFeatures: [
			"Real-time data processing",
			"METAR conversion",
			"Historic data analysis",
			"API access",
			"Atmospheric modeling"
		],
		tools: ["python", "svelte"],
		liveUrl: "https://mars-metar.space",
		assets: {
			screenshots: [
				"/work/uploadcare-flex.png"
			]
		}
	}
];

// Helper function to get project by ID with fallback
export function getProject(id: string): Project {
	const project = projects.find(p => p.id === id);

	if (!project) {
		// Return a fallback project if ID not found
		return {
			id: "not-found",
			title: "Project Not Found",
			description: "This project may have been moved or deleted.",
			categories: ["404"],
			image: "/work/rocket-engine.png",
			keyFeatures: ["Feature not available"],
			tools: ["figma"],
			assets: {
				screenshots: []
			}
		};
	}

	return project;
}

// Helper to get next project
export function getNextProject(currentId: string): Project | null {
	const currentIndex = projects.findIndex(p => p.id === currentId);
	if (currentIndex === -1) return null;

	const nextIndex = (currentIndex + 1) % projects.length;
	return projects[nextIndex];
}