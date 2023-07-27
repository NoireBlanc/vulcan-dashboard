export const formatPieData = (data) => {
    const temp = [];
    for (const property in data) {
        if (parseInt(data[property]) != 0) temp.push({ name: property, value: parseInt(data[property]) });
    }
    return temp;
};
