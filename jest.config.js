// eslint-disable-next-line @typescript-eslint/no-var-requires
const gscopeMfeJestDefaults = require('@gscope-mfe/jest-config');
module.exports = async function () {
    const defaultConfig = await gscopeMfeJestDefaults({
        externals: {
            // You can pass custom overrides like this
            // '@stride-mfe/some-mfe-module': { version: '0.1.66', path: ['dist', 'main-unit-test.js'] },
            // or for react 18
            // 'react': { version: '18.2.0' },
            // 'react-dom': { version: '18.2.0' },
            // 'react-dom/test-utils': { version: '18.2.0' },
        },
    });
    return {
        ...defaultConfig,
        // Rest of your jest config goes here
    };
};
