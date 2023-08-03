import React from 'react';
import { formatPieData } from '../formatPieData.util';
import { payload } from '../../TestData/mockShipmentData';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
React.useLayoutEffect = React.useEffect;

describe('formatPieData', () => {
    it('should format correctly', () => {
        const formattedData = [
            { name: 'marketplace', value: '3298' },
            { name: 'dsv', value: '1144' },
            { name: 'direct', value: '995' },
            { name: 'store', value: '16' },
            { name: 'dc', value: '5587' },
        ];

        const result = formatPieData(payload[2].counts);
        expect(result).toEqual(formattedData);
    });
});
