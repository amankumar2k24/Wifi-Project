// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'next/font/google': path.resolve(__dirname, './node_modules/next/font/google'),
    };
    return config;
  },
};

module.exports = nextConfig;
