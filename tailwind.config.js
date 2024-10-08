/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Example content paths...
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    corePlugins: {
        preflight: false
    },
    theme: {
        extend: {},
    },
    plugins: [],
}