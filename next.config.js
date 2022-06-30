/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	/* config options here */
}

const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
		// If you use `MDXProvider`, uncomment the following line.
		providerImportSource: '@mdx-js/react',
	},
})
module.exports = withMDX({
	// Append the default value with md extensions
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})

module.exports = nextConfig
