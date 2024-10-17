// src/lib/chute-repack/data/db.ts

interface Website {
	url: string;
	html: string;
	css: string;
	analysisResult: string;
	improvedVersion: string;
}

export function saveWebsite(website: Website): void {
	const websites = JSON.parse(localStorage.getItem('websites') || '[]');
	websites.push(website);
	localStorage.setItem('websites', JSON.stringify(websites));
}

export function getWebsites(): Website[] {
	return JSON.parse(localStorage.getItem('websites') || '[]');
}

export function getMasterPrompt(): string {
	return localStorage.getItem('masterPrompt') || '';
}

export function setMasterPrompt(prompt: string): void {
	localStorage.setItem('masterPrompt', prompt);
}

export function saveImage(name: string, data: string): void {
	localStorage.setItem(`image_${name}`, data);
}

export function getImage(name: string): string | null {
	return localStorage.getItem(`image_${name}`);
}

export function getAllImages(): { name: string, data: string }[] {
	return Object.keys(localStorage)
		.filter(key => key.startsWith('image_'))
		.map(key => ({
			name: key.slice(6),
			data: localStorage.getItem(key) as string
		}));
}

export function generateFinalPrompt(website: Website): string {
	const masterPrompt = getMasterPrompt();
	const images = getAllImages();

	return `
    ${masterPrompt}

    Website URL: ${website.url}

    HTML:
    ${website.html}

    CSS:
    ${website.css}

    Analysis Result:
    ${website.analysisResult}

    Improved Version:
    ${website.improvedVersion}

    Images:
    ${images.map(img => img.name).join(', ')}
  `;
}