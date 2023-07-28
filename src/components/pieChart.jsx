import React from 'react';
import {
    MaterialUiCore,
    // @ts-ignore
} from '@gscope-mfe/common-libs';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Legend } from 'recharts';

const { Box } = MaterialUiCore;

const COLORS = [
    '#420000',
    '#8bd000',
    '#5823a9',
    '#003f00',
    '#9792ff',
    '#bc0000',
    '#00f1ff',
    '#610000',
    '#00bfff',
    '#ff6a82',
    '#00aa92',
    '#ff83bd',
    '#003b41',
    '#4d3100',
    '#1a002b',
];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 25) * cos;
    const my = cy + (outerRadius + 25) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 15;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default function Chart({ pieData, title }) {
    const [state, setState] = React.useState({ activeIndex: 0 });

    const onPieEnter = (_, index) => {
        setState({
            activeIndex: index,
        });
    };

    const legendHandler = (_, index) => {
        setState({
            activeIndex: index,
        });
    };

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width="25%" height="95%">
            <strong style={{ fontSize: '20px' }}>{title}</strong>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width="100%" height="100%">
                    <Pie
                        activeIndex={state.activeIndex}
                        activeShape={renderActiveShape}
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <text
                        x="50%"
                        y="77%"
                        fontWeight={'bold'}
                        textAnchor="middle"
                    >{`Legend Keys: ${pieData.length}`}</text>
                    <Legend onClick={legendHandler} verticalAlign={'bottom'} height="20%" />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
}
