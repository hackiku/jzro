// src/routes/chute-repack/repacks/+page.server.ts
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function load() {
	// Define path to repacks directory
	const repacksPath = join(process.cwd(), 'src/lib/chute-repack/repacks');

	try {
		// Read directories in repacks folder
		const dirs = await readdir(repacksPath, { withFileTypes: true });

		// Filter directories only and create repack objects
		const repacks = dirs
			.filter(dirent => dirent.isDirectory())
			.map(dir => ({
				name: dir.name.split('.')[0], // Remove .io etc from name
				slug: dir.name,
				description: `Redesigned landing page for ${dir.name}`,
			}));

		return { repacks };
	} catch (error) {
		console.error('Error loading repacks:', error);
		return { repacks: [] };
	}
}