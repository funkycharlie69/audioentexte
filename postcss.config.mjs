/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {
      // Disable OKLCH colors for html2canvas compatibility
      features: {
        oklch: false,
      },
    },
    autoprefixer: {},
  },
};

export default config;


export default config
