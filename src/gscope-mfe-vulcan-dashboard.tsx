// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactDOM from 'react-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import singleSpaReact from 'single-spa-react';
import Root from './root.component';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import singleSpaCss from 'single-spa-css';

const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: Root,
    errorBoundary(err, info, props) {
        // Customize the root error boundary for your microfrontend here.
        return null;
    },
});

const cssLifecycles = singleSpaCss({
    cssUrls: [],
    // @ts-ignore
    webpackExtractedCss: !__GSCOPE_MFE_IS_DEV__,
    timeout: 2 * 60 * 1000,
});

// Export an array of lifecycles to integrate with a framework's
// single-spa lifecycles. The order matters.
export const bootstrap = [cssLifecycles.bootstrap, reactLifecycles.bootstrap];
export const mount = [
    // The CSS lifecycles should be before your framework's mount lifecycle,
    // to avoid a Flash of Unstyled Content (FOUC)
    cssLifecycles.mount,
    reactLifecycles.mount,
];

export const unmount = [
    // The CSS lifecycles should be after your framework's unmount lifecycle,
    // to avoid a Flash of Unstyled Content (FOUC)
    reactLifecycles.unmount,
    cssLifecycles.unmount,
];
