const databaseReader = require('./src/outputs/postgres');
const ws = require('./src/ws/server');

// Function to handle errors when reading CPU usage from the database
function handleDatabaseError(err) {
    console.error('Error reading CPU usage from database:', err);
}

// Function to fetch CPU usage from the database and send it to WebSocket clients
function fetchAndSendCPUUsage() {
    databaseReader.readCPUUsageFromDatabase((err, cpuUsage) => {
        if (err) {
            handleDatabaseError(err);
            return;
        }
        ws.sendCPUUsageToClients(cpuUsage);
    });
}

// Initial fetch and send CPU usage
fetchAndSendCPUUsage();

// Set interval for periodic fetch and send CPU usage
const fetchInterval = setInterval(fetchAndSendCPUUsage, 1000);

// Event listener for WebSocket server listening event
ws.wss.on('listening', () => {
    console.log('WebSocket server is listening on port 8081');
});

// Cleanup function to clear interval when application exits
process.on('SIGINT', () => {
    clearInterval(fetchInterval);
    console.log('Exiting application');
    process.exit();
});
