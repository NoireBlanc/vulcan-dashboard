import React from 'react';
import { buildUrl } from '../buildUrl.util';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
React.useLayoutEffect = React.useEffect;

describe('buildUrl', () => {
    it('should build url correctly', () => {
        const url = 'https://mock-url.com?';
        const expectedUrl = 'https://mock-url.com?&carriers=fedex&carriers=ups&carriers=usps&carriers=lasership';

        const carriers = ['fedex', 'ups', 'usps', 'lasership'];

        const result = buildUrl(url, carriers, 'carriers');
        expect(result).toEqual(expectedUrl);
    });
    it('should handle empty input', () => {
        const url = 'https://mock-url.com?';
        const expectedUrl = 'https://mock-url.com?';

        const carriers = [];

        const result = buildUrl(url, carriers, 'carriers');
        expect(result).toEqual(expectedUrl);
    });
});
