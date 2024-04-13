const logger = require("../utils/logger");
const { dataTypes } = require("../utils/constants");

async function shouldSendNotication(type, data) {
  switch (type) {
    case dataTypes.cpuUsage:
      break;
    case dataTypes.diskUsage:
      break;
    case dataTypes.memoryUsage:
      break;
    case dataTypes.numberProcesses:
      break;

    default:
      break;
  }
}

module.exports = { shouldSendNotication };
