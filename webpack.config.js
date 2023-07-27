/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const gscopeMfeDefaults = require('@gscope-mfe/webpack-config');

const orgName = 'gscope-mfe';
const projectName = 'vulcan-dashboard';

module.exports = (webpackConfigEnv, argv) => {
    const { mode } = argv;
    const externals = [];
    const systemDefaultConfig = gscopeMfeDefaults(
        {
            orgName,
            projectName,
            libraryTarget: 'system',
            usesReact: true,
            splitCss: true,
        },
        webpackConfigEnv,
        argv,
    );
    const configs = [
        merge(systemDefaultConfig, {
            externals,
        }),
    ];
    if (mode === 'production') {
        const umdDefaultConfig = gscopeMfeDefaults(
            {
                orgName,
                projectName,
                libraryTarget: 'umd',
                isUnitTestBuild: true,
                usesReact: true,
            },
            webpackConfigEnv,
            argv,
        );
        configs.push(
            merge(umdDefaultConfig, {
                externals,
            }),
        );
    }
    return configs;
};
