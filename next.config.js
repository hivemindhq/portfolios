/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'portfolioutility.pockethost.io',
			},
		],
	},
};

module.exports = nextConfig;
