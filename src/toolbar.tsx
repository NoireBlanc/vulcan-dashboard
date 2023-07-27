import React from 'react';
import MultipleSelectCheckmarks from './components/multiCheckSelect';
import {
    DateRangePicker as _DateRangePickerModule,
    // @ts-ignore
} from '@gscope-mfe/common-components';
import {
    MaterialUiCore,
    // @ts-ignore
} from '@gscope-mfe/common-libs';
import { SHIPMENT_TYPES, SENDER_TYPES, CHANNELS } from './constants/data';
import { fetchCarriers, fetchMilestones } from './queries';
import { useQuery } from 'react-query';

const { Button, Box } = MaterialUiCore;
const DateRangePicker = _DateRangePickerModule.default;

export default function Toolbar({ fetch }) {
    const { isLoading: milestonesLoading, data: milestoneData } = useQuery('milestones', fetchMilestones);
    const { isLoading: carriersLoading, data: carrierData } = useQuery('carriers', fetchCarriers);
    const [milestoneIds, setMilestoneIds] = React.useState<string[]>([]);
    const [milestoneDescs, setMilestoneDescs] = React.useState<string[]>([]);
    const [milestones, setMilestones] = React.useState(new Map());
    const [carrierIds, setCarrierIds] = React.useState<string[]>([]);
    const [milestonesReady, setMilestonesReady] = React.useState(false);
    const [carriersReady, setCarriersReady] = React.useState(false);
    const [filters, setFilters] = React.useState({
        created_on: { start: new Date(Date.now()).toISOString(), end: new Date(Date.now()).toISOString() },
        oedd: { start: new Date(Date.now()).toISOString(), end: new Date(Date.now()).toISOString() },
        carriers: [],
        types: SHIPMENT_TYPES,
        senderTypes: SENDER_TYPES,
        channels: CHANNELS,
        milestones: [],
    });
    const [open, setOpen] = React.useState(false);
    const [oeddOpen, setOeddOpen] = React.useState(false);

    const chooseFilters = (message, attr) => {
        const filter = {};
        filter[attr] = message;
        setFilters((filters) => ({
            ...filters,
            ...filter,
        }));
    };

    const processMilestoneData = () => {
        milestoneData.payload.forEach((milestone) => {
            if (!isNaN(milestone.id) && parseInt(milestone.id) < 1000) {
                setMilestoneIds((milestoneIds) => [...milestoneIds, milestone.id]);
                const name = milestone.id + ' - ' + milestone.desc;
                setMilestoneDescs((milestoneDescs) => [...milestoneDescs, name]);
                setMilestones((milestones) => new Map(milestones.set(name, milestone.id)));
            }
        });
        setMilestonesReady(true);
    };

    const processCarrierData = () => {
        carrierData.payload.forEach((carrier) => {
            setCarrierIds((carrierIds) => [...carrierIds, carrier.name]);
        });
        setCarriersReady(true);
    };

    const handleDateChange = (startDate, endDate, attr) => {
        const message = { start: startDate.toISOString(), end: endDate.toISOString() };
        chooseFilters(message, attr);
    };

    const handleButton = () => {
        fetch(filters);
    };

    React.useEffect(() => {
        chooseFilters(milestoneIds, 'milestones');
        setMilestoneDescs((milestoneDescs) =>
            Array.from(
                milestoneDescs.sort((a, b) => {
                    const value1 = parseInt(milestones.get(a));
                    const value2 = parseInt(milestones.get(b));
                    if (value1 < value2) {
                        return -1;
                    }
                    if (value1 > value2) {
                        return 1;
                    }

                    return 0;
                }),
            ),
        );
    }, [milestoneIds]);
    React.useEffect(() => {
        chooseFilters(carrierIds, 'carriers');
    }, [carrierIds]);
    React.useEffect(() => {
        if (!milestonesLoading) processMilestoneData();
    }, [milestonesLoading]);
    React.useEffect(() => {
        if (!carriersLoading) processCarrierData();
    }, [carriersLoading]);

    if (!carriersReady || !milestonesReady) return <p>Loading...</p>;
    return (
        <div style={{ width: '95vw', maxWidth: '95vw', height: '170px', display: 'inline-flex', flexDirection: 'row' }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', height: '100%' }}>
                <div>
                    <MultipleSelectCheckmarks
                        names={SHIPMENT_TYPES}
                        label="Shipment Types"
                        attr="types"
                        chooseFilter={chooseFilters}
                    />
                </div>
                <div style={{ margin: 5, marginLeft: 15 }}>
                    <p>Shipment Created On</p>
                    <DateRangePicker
                        startDate={new Date()}
                        endDate={new Date()}
                        onChangeHandler={(startDate, endDate) => handleDateChange(startDate, endDate, 'created_on')}
                        open={open}
                        handleClose={setOpen}
                    />
                </div>
            </div>
            <div style={{ display: 'inline-flex', flexDirection: 'column', height: '100%' }}>
                <div>
                    <MultipleSelectCheckmarks
                        names={SENDER_TYPES}
                        label="Seller Types"
                        attr="senderTypes"
                        chooseFilter={chooseFilters}
                    />
                </div>
                <div style={{ margin: 5, marginLeft: 15 }}>
                    <p>OEDD Range</p>
                    <DateRangePicker
                        startDate={new Date()}
                        endDate={new Date()}
                        onChangeHandler={(startDate, endDate) => handleDateChange(startDate, endDate, 'oedd')}
                        open={oeddOpen}
                        handleClose={setOeddOpen}
                    />
                </div>
            </div>
            <div style={{ display: 'inline-flex', flexDirection: 'row', flexWrap: 'wrap', maxWidth: '80%' }}>
                <MultipleSelectCheckmarks
                    names={CHANNELS}
                    label="Channels"
                    attr="channels"
                    chooseFilter={chooseFilters}
                />
                <MultipleSelectCheckmarks
                    names={carrierIds}
                    label="Carriers"
                    attr="carriers"
                    chooseFilter={chooseFilters}
                />
                <MultipleSelectCheckmarks
                    names={milestoneDescs}
                    label="Milestones"
                    attr="milestones"
                    chooseFilter={(message, attr) => {
                        const milestoneList = [];
                        message.forEach((milestone) => {
                            milestoneList.push(milestones.get(milestone));
                        });
                        chooseFilters(milestoneList, attr);
                    }}
                />
                <MultipleSelectCheckmarks
                    names={CHANNELS}
                    label="Channels"
                    attr="channels"
                    chooseFilter={chooseFilters}
                />
                <Box display="flex" height="40px" marginLeft="auto" marginRight="25px" marginTop="10px">
                    <Button variant="contained" onClick={handleButton} size="medium">
                        Apply Filters
                    </Button>
                </Box>
            </div>
        </div>
    );
}
