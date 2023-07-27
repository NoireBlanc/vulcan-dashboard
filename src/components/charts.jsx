import React from 'react';
import PieChart from './pieChart';

export default function charts({ pieData }) {
    return (
        <div
            style={{
                width: '95vw',
                height: '480px',
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <PieChart pieData={pieData[0]} title="Carriers" />
            <PieChart pieData={pieData[1]} title="Shipment Types" />
            <PieChart pieData={pieData[2]} title="Sender Types" />
            <PieChart pieData={pieData[3]} title="Milestones" />
        </div>
    );
}
