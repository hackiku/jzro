// src/lib/content/work/data/projectUtils.ts

// Constants
const PROJECT_BASE_PATH = '/work/projects';
const FALLBACK_IMAGE = '/work/rocket-engine.png';

interface ProjectAssets {
	moneyshot: string;
	gallery: string[];
}

// Cache project assets to avoid repeated filesystem operations
const PROJECT_ASSETS: Record<string, ProjectAssets> = {
	'omicron-blockchain': {
		moneyshot: '/work/projects/omicron-blockchain/moneyshot.png',
		gallery: [
			'/work/projects/omicron-blockchain/hero.png',
			'/work/projects/omicron-blockchain/omicron-mood.png'
		]
	},
	'wingy': {
		moneyshot: '/work/projects/wingy/moneyshot.png',
		gallery: []
	},
	'6pack-avionics': {
		moneyshot: '/work/projects/6pack-avionics/moneyshot.jpg',
		gallery: []
	},
	'wordagents': {
		moneyshot: '/work/projects/wordagents/moneyshot.png',
		gallery: [
			'/work/projects/wordagents/wordagents-olive.png',
			'/work/projects/wordagents/wordagents-wire.png'
		]
	},
	// Add other projects as needed
};

export function getProjectAssets(projectId: string): ProjectAssets {
	const assets = PROJECT_ASSETS[projectId];
	if (!assets) {
		return {
			moneyshot: FALLBACK_IMAGE,
			gallery: []
		};
	}
	return assets;
}

export function enrichProjectData(project: Project): EnrichedProject {
	const assets = getProjectAssets(project.id);
	return {
		...project,
		image: assets.moneyshot, // For hero section
		assets: {
			moneyshot: assets.moneyshot,
			gallery: [assets.moneyshot, ...assets.gallery] // Include moneyshot in gallery
		}
	};
}

export type EnrichedProject = ReturnType<typeof enrichProjectData>;