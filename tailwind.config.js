const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs: '420px',
            ...defaultTheme.screens,
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
