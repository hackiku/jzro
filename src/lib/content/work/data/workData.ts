// src/lib/content/work/data/workData.ts

import type { Project } from './types';
import { tools } from './types';

export const projects: Project[] = [
	{
		id: "6pack-avionics",
		title: "6pack Avionics",
		description: "Digital instruments for the next generation of pilots", // Card view
		longDescription: "An innovative digital avionics solution that brings modern UX principles to general aviation cockpits, helping student pilots transition between glass and analog instruments seamlessly.",
		categories: ["Product Design", "Aerospace", "Hardware"],
		tools: ["figma", "python", "onshape"],
		problem: "Student pilots trained on modern glass cockpits struggle to transition to traditional analog instruments, while those trained on analog struggle with glass. This creates a safety risk and longer training times.",
		solution: "Developed a hybrid digital/analog interface that teaches both mental models simultaneously, with innovative visualization techniques that bridge the gap between traditional and modern instruments.",
		results: "27% improvement in student instrument scanning patterns, 40% reduction in transition training time, and positive feedback from 12 flight schools during beta testing.",
		keyFeatures: [
			"Dynamic instrument visualization modes",
			"Real-time transition between analog and digital",
			"Customizable scan pattern training",
			"Integrated lesson plans for CFIs",
			"Voice-activated checklists",
			"Aviation database integration"
		],
		liveUrl: "https://6pack.aero",
		githubUrl: "https://github.com/jzro/6pack-avionics"
	},
	{
		id: "spacefomo",
		title: "SpaceFOMO",
		description: "Never miss a rocket launch again", // Card view
		longDescription: "A modern space event tracking platform that makes space missions accessible and engaging for everyone, from casual observers to aerospace professionals.",
		categories: ["Web App", "Space", "Data Viz"],
		tools: ["svelte", "python", "docker"],
		problem: "Space enthusiasts struggle to keep track of upcoming launches and missions across multiple space agencies and private companies. Existing solutions are either too technical or lack engagement features.",
		solution: "Created a user-friendly platform that aggregates space events, uses machine learning to predict viewing conditions, and builds community through shared experiences.",
		results: "100,000+ monthly active users, featured on Product Hunt, and partnership with 3 major space tourism companies.",
		keyFeatures: [
			"Real-time launch tracking",
			"Personalized viewing forecasts",
			"Mission success predictions",
			"Community event planning",
			"Launch photography guides",
			"Space agency API integration"
		],
		liveUrl: "https://spacefomo.com",
		githubUrl: "https://github.com/jzro/spacefomo"
	},
	{
		id: "pipewriter",
		title: "Pipewriter",
		description: "Figma-style wireframing in Google Docs", // Card view
		longDescription: "A powerful wireframing tool that brings modern design capabilities to technical writers and UX designers who live in documentation. Built for the documentation-driven development workflow.",
		categories: ["SaaS", "Developer Tools", "Design"],
		tools: ["figma", "svelte", "docker"],
		problem: "Technical writers and UX designers waste time switching between documentation and design tools, leading to inconsistencies and communication gaps in product development.",
		solution: "Developed a Google Docs extension that brings Figma-like wireframing capabilities directly into the documentation workflow, with real-time collaboration features.",
		results: "Adopted by 50+ technical writing teams, 4.8/5 rating on Google Workspace Marketplace, 60% reduction in design-to-documentation time reported by users.",
		keyFeatures: [
			"Native Google Docs integration",
			"Real-time collaborative editing",
			"UI component library",
			"Version control for wireframes",
			"Design system support",
			"Export to Figma"
		],
		liveUrl: "https://pipewriter.io",
		githubUrl: "https://github.com/jzro/pipewriter"
	},
	{
		id: "wingy",
		title: "Wingy",
		description: "Parametric wing design for everyone", // Card view
		longDescription: "A modern web application that democratizes aerospace design by bringing parametric wing modeling to browser, powered by Onshape's API and advanced composite material calculations.",
		categories: ["Engineering", "Aerospace", "CAD"],
		tools: ["svelte", "python", "onshape"],
		problem: "Aerospace designers need to rapidly iterate on wing designs with different materials and parameters, but traditional CAD tools are complex and don't provide real-time performance feedback.",
		solution: "Created a specialized wing design tool that combines intuitive UI with powerful parametric modeling, leveraging Onshape's API for real-time 3D visualization and engineering calculations.",
		results: "Used by 3 UAV startups for prototype development, reduced initial wing design time from weeks to days, and enabled real-time collaboration between engineers and manufacturers.",
		keyFeatures: [
			"Parametric airfoil generation",
			"Real-time 3D preview",
			"Composite material optimizer",
			"Direct Onshape integration",
			"Performance predictions",
			"Structural analysis",
			"Manufacturing cost estimates"
		],
		liveUrl: "https://wingy.vercel.app",
		githubUrl: "https://github.com/jzro/wingy"
	}
];

// Export helper functions remain the same
export function getProject(id: string): Project {
	const project = projects.find(p => p.id === id);
	if (!project) return /* your fallback logic */;
	return project;
}

export function getNextProject(currentId: string): Project | null {
	const currentIndex = projects.findIndex(p => p.id === currentId);
	if (currentIndex === -1) return null;
	const nextIndex = (currentIndex + 1) % projects.length;
	return projects[nextIndex];
}