export const buildUrl = (url, list, param) => {
    list.forEach((item) => {
        url += `&${param}=${item.toLowerCase()}`;
    });
    return url;
};
