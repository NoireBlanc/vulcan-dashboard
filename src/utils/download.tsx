export default function download(data, type, fileName) {
    const blob = new Blob([data], { type: `text/${type}` });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.setAttribute('href', url);
    a.setAttribute('download', `${fileName}.${type}`);
    a.click();
}
