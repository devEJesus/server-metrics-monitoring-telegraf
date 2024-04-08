const databaseReader = require("./src/outputs/postgres");
const ws = require("./src/ws/server");

// Initial fetch and send for each type of data
const dataTypes = ["cpuUsage", "memoryUsage", "diskUsage"];

// Function to handle errors when reading data from the database
function handleDatabaseError(err) {
  console.error("Error reading data from database:", err);
}

// Function to fetch data from the database and send it to WebSocket clients
function fetchDataAndSend(type) {
  databaseReader.readDataFromDatabase(type, (err, data) => {
    if (err) {
      handleDatabaseError(err);
      return;
    }
    ws.sendDataToClients(type, data);
  });
}

dataTypes.forEach((type) => {
  fetchDataAndSend(type);
});

// Set interval for periodic fetch and send for each type of data
const fetchInterval = setInterval(() => {
  dataTypes.forEach((type) => {
    fetchDataAndSend(type);
  });
}, 2000);

// Event listener for WebSocket server listening event
ws.wss.on("listening", () => {
  console.log("WebSocket server is listening on port 8081");
});

// Cleanup function to clear interval when application exits
process.on("SIGINT", () => {
  clearInterval(fetchInterval);
  console.log("Exiting application");
  process.exit();
});
