/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Agrega esta línea para GitHub Pages:
  assetPrefix: process.env.NODE_ENV === 'production' ? '/nombre-repositorio' : '',
}

module.exports = nextConfig