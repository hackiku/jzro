// src/lib/content/work/data/workData.ts
export interface Project {
	title: string;
	description: string;
	categories: string[];
	image: string;
	keyFeatures: string[];
}

export const projects: Project[] = [
	{
		title: "6pack Avionics",
		description: "An innovative avionics system for small aircraft.",
		categories: ["Product Design", "Aerospace Engineering"],
		image: "/work/6pack-avionics.png",
		keyFeatures: [
			"Intuitive user interface",
			"Compact design",
			"Integration with existing systems"
		]
	},
	{
		title: "SpaceFOMO",
		description: "A platform for space enthusiasts to stay updated on space missions.",
		categories: ["Product Design", "Web Design"],
		image: "/work/spacefomo.png",
		keyFeatures: [
			"Real-time mission updates",
			"Interactive space map",
			"Personalized notifications"
		]
	},
	{
		title: "Pipewriter",
		description: "A wireframing tool for writers to visualize their content structure.",
		categories: ["Product Design", "Web Design", "Dev"],
		image: "/work/pipewriter.png",
		keyFeatures: [
			"Drag-and-drop interface",
			"Content block templates",
			"Export to multiple formats"
		]
	},
	{
		title: "Redocly",
		description: "Technical documentation platform with a focus on API documentation.",
		categories: ["Copywriting", "Dev"],
		image: "/work/logos/redocly-logo.svg",
		keyFeatures: [
			"Clear and concise API documentation",
			"Interactive API console",
			"Customizable themes"
		]
	},
	{
		title: "Wordagents",
		description: "Content creation service for businesses and marketers.",
		categories: ["Copywriting"],
		image: "/work/wordagents-logo.png",
		keyFeatures: [
			"High-quality, SEO-optimized content",
			"Fast turnaround times",
			"Wide range of content types"
		]
	},
	{
		title: "FlowMyFigma",
		description: "Figma plugin for creating user flow diagrams.",
		categories: ["Product Design", "Dev"],
		image: "/work/flowmyfigma.png",
		keyFeatures: [
			"Automatic connection of frames",
			"Customizable flow styles",
			"Export to various formats"
		]
	},
	{
		title: "Uploadcare",
		description: "File uploading and processing service for developers.",
		categories: ["Copywriting", "Dev"],
		image: "/work/logos/uploadcare-logo.svg",
		keyFeatures: [
			"Easy integration",
			"Automatic image optimization",
			"Secure file handling"
		]
	}
];