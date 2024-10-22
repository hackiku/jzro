// @ts-nocheck
// src/routes/work/[id]/+page.ts

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { projects } from '$lib/content/work/data/workData';

export const load = ({ params }: Parameters<PageLoad>[0]) => {
	const currentIndex = projects.findIndex(p => p.id === params.id);

	if (currentIndex === -1) {
		throw error(404, {
			message: 'Project not found'
		});
	}

	const currentProject = projects[currentIndex];
	const nextProject = projects[(currentIndex + 1) % projects.length];

	return {
		project: currentProject,
		nextProject
	};
};