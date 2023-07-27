import React from 'react';
import { act } from 'react-dom/test-utils';
import Grid from '../grid';
import { payload } from '../../TestData/mockShipmentData';
import { mount, configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
React.useLayoutEffect = React.useEffect;

describe('<Grid />', () => {
    it('should render', () => {
        act(() => {
            let wrapper = mount(<Grid data={payload.slice(4)} />);
            const { container } = wrapper;
            expect(container).toMatchSnapshot();
        });
    });
});
