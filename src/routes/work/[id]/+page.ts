// src/routes/work/[id]/+page.ts

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { projects } from '$lib/content/work/data/workData';
import { enrichProjectData } from '$lib/content/work/data/projectUtils';

export const load = ({ params }) => {
	const project = projects.find(p => p.id === params.id);

	if (!project) {
		throw error(404, {
			message: 'Project not found'
		});
	}

	const enrichedProject = enrichProjectData(project);
	const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
	const enrichedNextProject = enrichProjectData(nextProject);

	return {
		project: enrichedProject,
		nextProject: enrichedNextProject
	};
};