import React from 'react';
import { act } from 'react-dom/test-utils';
import PieChart from '../pieChart';
import { formatPieData } from '../../utils/formatPieData.util';
import { payload } from '../../TestData/mockShipmentData';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

configure({ adapter: new Adapter() });
React.useLayoutEffect = React.useEffect;

describe('<PieChart />', () => {
    it('should render', () => {
        act(() => {
            let wrapper = mount(<PieChart pieData={formatPieData(payload[0].counts)} />);
            const { container } = wrapper;
            expect(container).toMatchSnapshot();
        });
    });
});
