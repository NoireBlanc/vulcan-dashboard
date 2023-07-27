import { buildUrl } from './utils/buildUrl.util';
import axios from './axios';

export const fetchCarriers = async ({ queryKey }) => {
    const { _key } = queryKey;
    const response = await axios.get(
        'http://stride-tnt-inbound-package.wcnp.prod.walmart.com/tnt-inbound-service/api/package/carriers',
        {
            headers: {
                'Account-Token': '8aab44b8-1781-458b-be0d-b771f5ef607b',
            },
        },
    );
    return response.data;
};

export const fetchMilestones = async ({ queryKey }) => {
    const { _key } = queryKey;
    const response = await axios.get(
        'http://stride-tnt-inbound-package.wcnp.prod.walmart.com/tnt-inbound-service/api/package/milestones',
        {
            headers: {
                'Account-Token': '8aab44b8-1781-458b-be0d-b771f5ef607b',
            },
        },
    );
    return response.data;
};

export const fetchData = async (filters) => {
    let url = `http://stride-tnt-inbound-package.wcnp.stg.walmart.com/tnt-inbound-service/api/package/shipments/start-date/${filters.created_on.start}/end-date/${filters.created_on.end}?`;

    if (filters.oedd.start && filters.oedd.end) {
        url += `oeddStart=${filters.oedd.start}&oeddEnd=${filters.oedd.end}`;
    }

    url = buildUrl(url, filters.carriers, 'carriers');
    url = buildUrl(url, filters.milestones, 'milestones');
    url = buildUrl(url, filters.types, 'types');
    url = buildUrl(url, filters.senderTypes, 'senderTypes');
    url = buildUrl(url, filters.channels, 'channels');

    const response = await axios.get(url, {
        headers: {
            'Account-Token': '8aab44b8-1781-458b-be0d-b771f5ef607b',
        },
    });
    return response.data;
};
