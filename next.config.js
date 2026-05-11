/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.hivemindrobotics.net',
				port: '',
				pathname: '/thumbnails/*',
			},
		],
	},
	turbopack: {},
};

module.exports = nextConfig;
