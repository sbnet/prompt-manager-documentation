// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Prompt Manager Documentation',
			defaultLocale: 'fr',
			locales: {
				fr: {
					label: 'Français',
					lang: 'fr',
				},
				en: {
					label: 'English',
					lang: 'en',
				},
			},
			sidebar: [
				{
					label: 'Guide Utilisateur',
					translations: { en: 'User Guide' },
					autogenerate: { directory: 'fr/user' },
				},
			],
		}),
	],
});
