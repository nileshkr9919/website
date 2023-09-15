import Phone from './phone.svelte';
import Box from './box.svelte';
import Code from './code.svelte';
import Controls from './controls.svelte';

export const Auth = {
	Phone,
	Box,
	Code,
	Controls
};

import { safeAnimate, sleep, write } from '$lib/animations';
import { createResettable } from '$lib/utils/resettable';
import { animate } from 'motion';
import { getElSelector } from '../Products.svelte';

type State = {
	email: string;
	password: string;
	name: string;

	showControls: boolean;
	submitted: boolean;
	controls: {
		GitHub: boolean;
		Google: boolean;
		Apple: boolean;
		Microsoft: boolean;
	};
};

const state = createResettable<State>({
	email: '',
	password: '',
	name: "Walter O'Brian",
	showControls: false,
	submitted: false,
	controls: {
		GitHub: true,
		Google: false,
		Apple: false,
		Microsoft: false
	}
});

const emailToSet = 'walterobrian@example.com';
const passwordToSet = 'password';

const execute = async () => {
	const phone = getElSelector('phone');
	const box = getElSelector('box');
	const code = getElSelector('code');
	const controls = getElSelector('controls');

	// Reset
	const { update } = state.reset();

	await Promise.all([
		safeAnimate(box, { x: 260, y: 32, opacity: 0 }, { duration: 0.5 })?.finished,
		safeAnimate(code, { x: 200, y: 460, opacity: 0 }, { duration: 0.5 })?.finished,
		safeAnimate(phone, { x: 0, y: 0 }, { duration: 0.5 })?.finished,
		safeAnimate(controls, { x: 420, y: 0, opacity: 0 }, { duration: 0.5 })?.finished
	]);

	// Start
	await safeAnimate(box, { x: [260, 260], y: [48, 32], opacity: 1 }, { duration: 0.25, delay: 1 })
		?.finished;

	await sleep(150);

	await write(emailToSet, (v) => update((p) => ({ ...p, email: v })), 300);
	await sleep(150);

	await write(passwordToSet, (v) => update((p) => ({ ...p, password: v })), 300);
	await sleep(500);

	await safeAnimate(
		code,
		{ x: [200, 200], y: [460 + 16, 460], opacity: [0, 1] },
		{ duration: 0.25 }
	)?.finished;

	await sleep(500);

	update((p) => ({ ...p, submitted: true }));

	await sleep(1000);

	update((p) => ({ ...p, showControls: true }));
	safeAnimate(controls, { x: [420, 420], y: [16, 0], opacity: 1 }, { duration: 0.5 });
};

export const authController = {
	execute,
	state
};
