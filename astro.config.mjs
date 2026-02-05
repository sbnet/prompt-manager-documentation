// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Prompt Manager Documentation',
			defaultLocale: 'root',
			locales: {
				root: {
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
					items: [
						{
							label: 'Général',
							translations: { en: 'General' },
							autogenerate: { directory: 'user/general' }
						},
						{
							label: 'Concepts',
							translations: { en: 'Core' },
							autogenerate: { directory: 'user/core' }
						},
						{
							label: 'Gestion',
							translations: { en: 'Management' },
							autogenerate: { directory: 'user/management' }
						},
						{
							label: 'Développeurs',
							translations: { en: 'Developers' },
							autogenerate: { directory: 'user/developers' }
						},
					],
				},
			],
		}),
	],
});
