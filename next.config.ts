import type { NextConfig } from 'next'
import { PUBLIC_URL } from '@/src/config/url.config'

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		APP_ENV: process.env.APP_NEV,
		APP_URL: process.env.APP_URL,
		APP_DOMAIN: process.env.APP_DOMAIN,
		SERVER_URL: process.env.SERVER_URL
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.SERVER_URL}/uploads/:path*`
			}
		]
	},
	async redirects() {
		return [
			{
				source: PUBLIC_URL.admin(''),
				destination: PUBLIC_URL.admin('/settings-city'),
				permanent: true
			}
		]
	}
}

export default nextConfig
