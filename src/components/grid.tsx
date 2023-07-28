import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { mapToShipment } from '../utils/mapToShipment.util';

const columns: GridColDef[] = [
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

export default function Grid({ data }) {
    const [formattedData, setFormattedData] = React.useState<any[]>([]);

    const formatData = () => {
        setFormattedData([]);
        data.forEach((shipment) => {
            setFormattedData((formattedData) => [...formattedData, mapToShipment(shipment)]);
        });
    };

    React.useEffect(formatData, []);
    return (
        <div style={{ maxWidth: '95vw' }}>
            <DataGrid
                rows={formattedData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[20, 50, 100]}
                slots={{ toolbar: GridToolbar }}
                disableRowSelectionOnClick
            />
        </div>
    );
}
