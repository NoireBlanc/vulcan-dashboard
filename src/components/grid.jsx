import React from 'react';
import {
    DataGrid,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExportContainer,
    useGridApiContext,
} from '@mui/x-data-grid';
import { mapToShipment } from '../utils/mapToShipment.util';
import { fetchData } from '../utils/queries';
import { queryClient } from '../root.component';
import { MenuItem, Box } from '@mui/material';
import csvMaker from '../utils/csvMaker.util';
import download from '../utils/download';

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

export default function Grid({ data, totalHits, filters }) {
    const [formattedData, setFormattedData] = React.useState([]);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [rawData, setData] = React.useState(data);

    const exportAllRows = async (apiRef) => {
        let allRows = [];

        for (let i = 0; i < totalHits && i < 10000; i += 1000) {
            const data = await queryClient.fetchQuery('data', () => fetchData(filters, false, i));
            allRows.push(...data.payload);
        }

        let formattedRows = [];
        allRows.forEach((shipment) => {
            formattedRows.push(mapToShipment(shipment));
        });

        const csv = csvMaker(formattedRows, columns);
        download(csv, 'csv', 'ShipmentData');
    };

    const GridCsvExportMenuItem = (props) => {
        const apiRef = useGridApiContext();
        const { hideMenu, options, ...other } = props;

        return (
            <MenuItem
                onClick={() => {
                    exportAllRows(apiRef);
                    hideMenu?.();
                }}
                {...other}
            >
                {apiRef.current.getLocaleText('toolbarExportCSV')}
            </MenuItem>
        );
    };

    const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => {
        return (
            <GridToolbarExportContainer {...other}>
                <GridCsvExportMenuItem />
            </GridToolbarExportContainer>
        );
    };

    function CustomToolbar(props) {
        return (
            <GridToolbarContainer {...props}>
                <GridToolbarDensitySelector />
                <GridToolbarColumnsButton />
                <GridToolbarExport />
                <Box>
                    <b>{`Total Hits: ${totalHits}`}</b>
                </Box>
            </GridToolbarContainer>
        );
    }

    const formatData = () => {
        setFormattedData([]);
        rawData.forEach((shipment) => {
            setFormattedData((formattedData) => [...formattedData, mapToShipment(shipment)]);
        });
        setIsLoading(false);
    };

    const updateGrid = async (from) => {
        const temp = await queryClient.fetchQuery('data', () => fetchData(filters, false, from));
        if (temp.errors) {
            setIsLoading(false);
            return;
        }
        setData([...rawData, ...temp.payload]);
    };

    const fetchNextPage = () => {
        const totalLoaded = paginationModel.pageSize * (paginationModel.page + 1);

        if (totalLoaded >= rawData.length && totalLoaded < 10000 && totalLoaded < totalHits) {
            setIsLoading(true);
            updateGrid(totalLoaded);
        }
    };

    React.useEffect(formatData, [rawData]);
    React.useEffect(fetchNextPage, [paginationModel]);
    return (
        <div style={{ maxWidth: '95vw', maxHeight: '600px' }}>
            <DataGrid
                rows={formattedData}
                columns={columns}
                paginationModel={paginationModel}
                loading={isLoading}
                onPaginationModelChange={setPaginationModel}
                slots={{ toolbar: CustomToolbar }}
                disableRowSelectionOnClick
            />
        </div>
    );
}
