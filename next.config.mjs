/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'], // Serve AVIF/WebP when the browser supports it
  },
}

export default nextConfig
