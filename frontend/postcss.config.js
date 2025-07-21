/** @type {import('postcss').ProcessOptions} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// ✅ Correct CommonJS export
module.exports = config;
