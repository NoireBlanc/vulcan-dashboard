import React from 'react';
import { act } from 'react-dom/test-utils';
import Toolbar from '../toolbar';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { QueryClient, QueryClientProvider } from 'react-query';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

configure({ adapter: new Adapter() });
React.useLayoutEffect = React.useEffect;

const queryClient = new QueryClient();

describe('<Toolbar />', () => {
    it('should render', () => {
        act(() => {
            let wrapper = mount(
                <QueryClientProvider client={queryClient}>
                    <Toolbar
                        fetch={() => {
                            null;
                        }}
                        chooseFilters={() => {
                            null;
                        }}
                    />
                </QueryClientProvider>,
            );
            const { container } = wrapper;
            expect(container).toMatchSnapshot();
        });
    });
});
