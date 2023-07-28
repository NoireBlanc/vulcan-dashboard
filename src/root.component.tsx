import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { PubSub } from '@gscope-mfe/app-bridge';
import {
    MaterialUiCore,
    MaterialUiPickers,
    MomentUtils,
    // @ts-ignore
} from '@gscope-mfe/common-libs';
// @ts-ignore
import { gscopeTheme } from '@gscope-mfe/common-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fetchData } from './queries';
import { formatPieData } from './utils/formatPieData.util';
import Grid from './components/grid';
import Charts from './components/charts';
import Toolbar from './toolbar';

const queryClient = new QueryClient();

const pubSub = new PubSub('@gscope-mfe/vulcan-dashboard');
const { MuiPickersUtilsProvider } = MaterialUiPickers;
const history = createBrowserHistory({
    basename: '/mfe/poc',
});
const ROOT_CONFIG = '@gscope-mfe/root';
const { ThemeProvider } = MaterialUiCore;
export default function Root() {
    const [message, setMessage] = React.useState('');
    React.useState(() => {
        const token = pubSub.subscribeToStateUpdate(ROOT_CONFIG, function (eventName, { message }) {
            setMessage(message);
            pubSub.publishStateUpdate({
                message: `thanks for sending: ${message}`,
            });
        });
        return () => pubSub.unsubscribeToStateUpdate(token);
    });
    return (
        <div id="single-spa-application:@gscope-mfe/vulcan-dashboard">
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <ThemeProvider theme={gscopeTheme}>
                    <Router history={history}>
                        <QueryClientProvider client={queryClient}>
                            <div>
                                {message && `${ROOT_CONFIG} sent message: ${message}`}
                                {/* A <Switch> looks through its children <Route>s and
                            renders the first one that matches the current URL. */}
                                <Switch>
                                    <Route path="/home" exact>
                                        <Home />
                                    </Route>
                                </Switch>
                            </div>
                        </QueryClientProvider>
                    </Router>
                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </div>
    );
}

function Home() {
    const [shipmentData, setShipmentData] = React.useState<any[]>([]);
    const [loadGrid, setLoadGrid] = React.useState(false);
    const [pieData, setPieData] = React.useState<any[][]>([]);
    const [message, setMessage] = React.useState<string>('No data available.');

    const fetch = async (filters) => {
        setLoadGrid(false);
        setMessage('Loading...');
        setPieData([]);
        const data = await queryClient.fetchQuery('data', () => fetchData(filters));

        if (data.errors) {
            setMessage(`Error ${data.errors[0].code}: ${data.errors[0].description}`);
        } else if (data.payload.slice(4).length === 0) {
            setMessage('No shipments available for given filters.');
        } else {
            setShipmentData(data.payload);
        }
    };

    const formatData = () => {
        if (!shipmentData || shipmentData.length === 0) return;

        for (let i = 0; i < 4; i++) {
            setPieData((pieData: any[][]) => [...pieData, formatPieData(shipmentData[i].counts)]);
        }

        setLoadGrid(true);
    };

    React.useEffect(formatData, [shipmentData]);
    return (
        <div style={{ height: '87vh', display: 'flex', flexFlow: 'column', maxWidth: '100%' }}>
            <div style={{ flex: '0 1 auto' }}>
                <Toolbar fetch={fetch} />
            </div>
            {loadGrid ? (
                <>
                    <Charts pieData={pieData} />
                    <Grid data={shipmentData.slice(4)} />
                </>
            ) : (
                <div
                    style={{
                        flex: '1 1 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <p>
                        <b>{message}</b>
                    </p>
                </div>
            )}
        </div>
    );
}
