/** @type {import('next').NextConfig} */
const isPages = process.env.PAGES === 'true';
const repo = 'thegardenca';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'img1.wsimg.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  basePath: isPages ? `/${repo}` : '',
  assetPrefix: isPages ? `/${repo}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? `/${repo}` : '',
  },
};

module.exports = nextConfig;
