export const formatPieData = (data: any[]) => {
    const temp: { name: string; value: number }[] = [];
    for (const property in data) {
        if (parseInt(data[property]) != 0) temp.push({ name: property, value: data[property] });
    }
    return temp;
};
