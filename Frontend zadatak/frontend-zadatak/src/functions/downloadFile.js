function downloadFile(filePath) {
    if (filePath) {
        var link = document.createElement('a');
        link.href = filePath;
        link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
        link.click();
    }
}

export default downloadFile;