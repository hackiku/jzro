// src/lib/chute-repack/data/db.ts

export const masterPrompt:string = "prompt here"

export function saveWebsite(website) {
	const websites = JSON.parse(localStorage.getItem('websites') || '[]');
	websites.push(website);
	localStorage.setItem('websites', JSON.stringify(websites));
}

export function getWebsites() {
	return JSON.parse(localStorage.getItem('websites') || '[]');
}

// export function prompt