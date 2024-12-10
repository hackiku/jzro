export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18')
];

export const server_loads = [];

export const dictionary = {
		"/": [8],
		"/(random)/boing": [9],
		"/chute-repack": [10],
		"/chute-repack/gui": [11],
		"/chute-repack/repacks": [~12],
		"/chute-repack/repacks/phasefour.io": [14,[4]],
		"/chute-repack/repacks/unbody": [15,[5]],
		"/chute-repack/repacks/[slug]": [13,[3]],
		"/menu": [16,[6]],
		"/work": [17,[7]],
		"/work/[id]": [18,[7]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';