import React from 'react';
import { mapToShipment } from '../mapToShipment.util';
import { payload } from '../../TestData/mockShipmentData';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
React.useLayoutEffect = React.useEffect;

describe('mapToShipment', () => {
    it('should map correctly', () => {
        const mappedData = {
            id: '34f3fa85-9f9f-4877-b14f-f3087840997d',
            order_id: '108817832299205',
            customer_order_id: '100000199866955',
            tracking_id: '1Z9728W19331607356910',
            carrier_id: 'ups',
            sender_type: 'MARKETPLACE',
            channel: 'DELIVERY',
            created_on: '2023-06-26T22:33:18',
            oedd: '2023-07-05T23:59:59',
            cedd: 'N/A',
            first_touch_event_local: '2023-06-26T22:33:24',
            status: '500',
            last_scan_local: '2023-06-26T22:35:59',
            status_desc: 'Delivered',
            carrier_status_code: 'FS',
            carrier_status_desc: 'Delivered',
            package_delivery_local: '2023-06-26T22:33:24',
        };

        const result = mapToShipment(payload[4]);
        expect(result).toEqual(mappedData);
    });
    it('should handle empty data', () => {
        const mappedData = {
            id: 'N/A',
            order_id: 'N/A',
            customer_order_id: 'N/A',
            tracking_id: 'N/A',
            carrier_id: 'N/A',
            sender_type: 'N/A',
            channel: 'N/A',
            created_on: 'N/A',
            oedd: 'N/A',
            cedd: 'N/A',
            first_touch_event_local: 'N/A',
            status: 'N/A',
            last_scan_local: 'N/A',
            status_desc: 'N/A',
            carrier_status_code: 'N/A',
            carrier_status_desc: 'N/A',
            package_delivery_local: 'N/A',
        };

        const result = mapToShipment({});
        expect(result).toEqual(mappedData);
    });
});
