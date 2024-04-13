const { dataTypes, notificationMetrics } = require("../utils/constants");
const email = require("../utils/email");

function shouldSendNotication(type, data) {
  switch (type) {
    case dataTypes.cpuUsage:
      cpuNotification(data);
      break;
    case dataTypes.diskUsage:
      diskusageNotification(data);
      break;
    case dataTypes.memoryUsage:
      memoryUsageNotification(data);
      break;
    case dataTypes.numberProcesses:
      numberProcessesNotification(data);
      break;

    default:
      break;
  }
}

function cpuNotification(data) {
  if (data < notificationMetrics.cpu) return;

  let subject = "Notication: CPU";
  let text = `The CPU is to high: ${data}.`;
  email.send(subject, text);
}

function diskusageNotification(data) {
  if (data < notificationMetrics.diskUsage) return;

  let subject = "Notication: disk memory";
  let text = `The disk memory is to high: ${data}.`;
  email.send(subject, text);
}

function memoryUsageNotification(data) {
  if (data < notificationMetrics.memory) return;

  let subject = "Notication: memory";
  let text = `The memory is to high: ${data}.`;
  email.send(subject, text);
}

function numberProcessesNotification(data) {
  if (data < notificationMetrics.processes) return;

  let subject = "Notication: number of processes";
  let text = `The number of processes is to high: ${data}.`;
  email.send(subject, text);
}

module.exports = { shouldSendNotication };
