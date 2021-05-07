module.exports = {
    purge: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
    corePlugins: {
        preflight: true, // false to stop removal of default browser styling
    },
};
