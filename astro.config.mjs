// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Prompt Manager Documentation',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/sbnet/prompt-manager-documentation' }],
			sidebar: [
				{
					label: 'User Guide',
					autogenerate: { directory: 'user' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
