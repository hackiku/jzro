// src/lib/chute-repack/api.ts
const API_BASE = 'http://your-backend-url:3000/api';

export async function scrapeWebsite(url: string) {
	const response = await fetch(`${API_BASE}/scrape`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ url })
	});
	return response.json();
}

// Similar functions for other API endpoints...