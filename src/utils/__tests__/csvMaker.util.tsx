import React from 'react';
import csvMaker from '../csvMaker.util';
import { mapToShipment } from '../mapToShipment.util';
import { payload } from '../../TestData/mockShipmentData';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
React.useLayoutEffect = React.useEffect;

describe('csvMaker', () => {
    it('should build CSV correctly', () => {
        const columns = [
            { field: 'customer_order_id', headerName: 'Customer Order Number', width: 180 },
            { field: 'order_id', headerName: 'PO Number', width: 160 },
            { field: 'tracking_id', headerName: 'Tracking Number', width: 180 },
            { field: 'carrier_id', headerName: 'Carrier', width: 100 },
            { field: 'sender_type', headerName: 'Sender Type', width: 90 },
            { field: 'channel', headerName: 'Channel', width: 90 },
            { field: 'created_on', headerName: 'Shipment Created On', width: 170 },
            { field: 'oedd', headerName: 'OEDD', width: 170 },
            { field: 'cedd', headerName: 'CEDD', width: 170 },
            { field: 'first_touch_event_local', headerName: 'First Touch Local', width: 170 },
            { field: 'status', headerName: 'Status Code', width: 90 },
            { field: 'status_desc', headerName: 'Status Description', width: 180 },
            { field: 'last_scan_local', headerName: 'Scan Time Local', width: 170 },
            { field: 'carrier_status_code', headerName: 'Carrier Status Code', width: 120 },
            { field: 'carrier_status_desc', headerName: 'Carrier Status Description', width: 180 },
            { field: 'package_delivery_local', headerName: 'Package Delivery Local', width: 170 },
        ];

        const expectedHeaders = `ID,Customer Order Number,PO Number,Tracking Number,Carrier,Sender Type,Channel,Shipment Created On,OEDD,CEDD,First Touch Local,Status Code,Status Description,Scan Time Local,Carrier Status Code,Carrier Status Description,Package Delivery Local
34f3fa85-9f9f-4877-b14f-f3087840997d,108817832299205,100000199866955,1Z9728W19331607356910,ups,MARKETPLACE,DELIVERY,2023-06-26T22:33:18,2023-07-05T23:59:59,N/A,2023-06-26T22:33:24,500,2023-06-26T22:35:59,Delivered,FS,Delivered,2023-06-26T22:33:24`;

        const result = csvMaker([mapToShipment(payload[4])], columns);
        expect(result).toEqual(expectedHeaders);
    });
});
