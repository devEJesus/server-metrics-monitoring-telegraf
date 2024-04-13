const databaseReader = require("./src/outputs/postgres");
const ws = require("./src/ws/server");
const logger = require("./src/utils/logger");
const { dataTypes } = require("./src/utils/constants");
const notification = require("./src/services/notication");

// Event listener for WebSocket server listening event
ws.wss.on("listening", () => {
  logger.info("WebSocket server is listening on port 8081");
});

// Function to handle errors when reading data from the database
function handleDatabaseError(err) {
  logger.error(`Error reading data from database: ${err}`);
}

// Function to fetch data from the database and send it to WebSocket clients
function fetchDataAndSend(type) {
  databaseReader.readDataFromDatabase(type, (err, data) => {
    if (err) {
      handleDatabaseError(err);
      return;
    }
    ws.sendDataToClients(type, data);
    notification.shouldSendNotication(type, data);
  });
}

Object.keys(dataTypes).forEach((type) => {
  fetchDataAndSend(type);
});

const fetchInterval = setInterval(() => {
  Object.keys(dataTypes).forEach((type) => {
    fetchDataAndSend(type);
  });
}, 2000);

// Cleanup function to clear interval when application exits
process.on("SIGINT", () => {
  clearInterval(fetchInterval);
  logger.info("Exiting application");
  process.exit();
});
