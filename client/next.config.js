
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  swSrc: 'service-worker.js',
})

module.exports = withPWA({
  reactStrictMode: true,
})

const nextConfig = {
  reactStrictMode: false,
  future: {
    webpack5: true,
  },

}

module.exports = nextConfig

//service worker development just with https?