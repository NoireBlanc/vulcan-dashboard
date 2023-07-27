import React from 'react';
import { act } from 'react-dom/test-utils';
import MultiCheckSelect from '../multiCheckSelect';
import { SHIPMENT_TYPES } from '../../constants/data';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
React.useLayoutEffect = React.useEffect;

describe('<MultiCheckSelect />', () => {
    it('should render', () => {
        act(() => {
            let wrapper = mount(<MultiCheckSelect names={SHIPMENT_TYPES} label={'Test'} />);
            const { container } = wrapper;
            expect(container).toMatchSnapshot();
        });
    });
});
