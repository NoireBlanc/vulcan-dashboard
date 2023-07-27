export const mapToShipment = (shipment) => {
    const newShipment = {
        id: shipment.id ? shipment.id : 'N/A',
        order_id: shipment.order_id ? shipment.order_id : 'N/A',
        customer_order_id: shipment.customer_order_id ? shipment.customer_order_id : 'N/A',
        tracking_id: shipment.tracking_id ? shipment.tracking_id : 'N/A',
        carrier_id: shipment.carrier_id ? shipment.carrier_id : 'N/A',
        sender_type: shipment.sender && shipment.sender.type ? shipment.sender.type : 'N/A',
        channel: shipment.channel ? shipment.channel : 'N/A',
        created_on: shipment.created_on ? new Date(shipment.created_on).toISOString().split('.')[0] : 'N/A',
        oedd: shipment.promised_estimated_delivery_end_date
            ? new Date(shipment.promised_estimated_delivery_end_date).toISOString().split('.')[0]
            : 'N/A',
        cedd:
            shipment.trackers && shipment.trackers[0].carrier_estimated_delivery_date
                ? new Date(shipment.trackers[0].carrier_estimated_delivery_date).toISOString().split('.')[0]
                : 'N/A',
        first_touch_event_local:
            shipment.trackers && shipment.trackers[0].first_touch_event_local
                ? new Date(shipment.trackers[0].first_touch_event_local).toISOString().split('.')[0]
                : 'N/A',
        status: shipment.status ? shipment.status : 'N/A',
        last_scan_local: 'N/A',
        status_desc: shipment.status_desc ? shipment.status_desc : 'N/A',
        carrier_status_code: 'N/A',
        carrier_status_desc: 'N/A',
        package_delivery_local:
            shipment.trackers && shipment.trackers[0].delivered_date_local
                ? new Date(shipment.trackers[0].delivered_date_local).toISOString().split('.')[0]
                : 'N/A',
    };

    if (!(shipment.trackers && shipment.trackers[0].tracking_details)) return newShipment;

    let lastScan = {
        event_time_local: 0,
        carrier_status_code: 'N/A',
        carrier_status_desc: 'N/A',
    };
    shipment.trackers[0].tracking_details.forEach((tracker) => {
        if (new Date(tracker.event_time_local) > new Date(lastScan.event_time_local) && tracker.carrier_status_code) {
            lastScan = tracker;
        }
    });

    newShipment.last_scan_local =
        lastScan.event_time_local !== 0 ? new Date(lastScan.event_time_local).toISOString().split('.')[0] : 'N/A';
    newShipment.carrier_status_code = lastScan.carrier_status_code;
    newShipment.carrier_status_desc = lastScan.carrier_status_desc;

    return newShipment;
};
