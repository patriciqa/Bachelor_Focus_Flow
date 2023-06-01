
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  swSrc: 'service-worker.js',
})

module.exports = withPWA({
  reactStrictMode: true,
  head: {
    link: [
      { rel: 'icon', href: 'image/mono-logo.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'image/mono-logo.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'image/mono-logo.png' },
      // Add more favicon sizes if available
    ],
  },
})

const nextConfig = {
  reactStrictMode: false,
}

module.exports = nextConfig

//service worker development just with https?