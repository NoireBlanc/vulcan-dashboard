export default function csvMaker(data, columns) {
    const csv = [];

    const headers = ['ID'];
    columns.forEach((header) => {
        headers.push(header.headerName);
    });
    csv.push(headers.join(','));

    data.forEach((item) => {
        csv.push(Object.values(item).join(','));
    });

    return csv.join('\n');
}
