/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log('-------------------------------------------------');
console.log(`API_URL: ${API_URL}`);
console.log('-------------------------------------------------');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  experimental: {
    proxyTimeout: 600000,
  },
  devIndicators: {
    position: 'bottom-right'
  },
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
    silenceDeprecations: [
      'legacy-js-api',
      'color-functions',
      'global-builtin',
      'import',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: `${API_URL}/:path*`,
      }
    ]
  }
};

export default nextConfig;
