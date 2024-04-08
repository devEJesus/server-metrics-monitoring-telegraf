const fs = require('fs');
const path = require('path');

const dir = "/tmp";
const filename = "metrics.out";
const filePath = path.join(dir, filename);

function readMetricsFile(callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            callback(err, null);
            return;
        }

        // Split the data into lines
        const lines = data.trim().split('\n');
        callback(null, lines);
    });
}

module.exports = {
    readMetricsFile
};
