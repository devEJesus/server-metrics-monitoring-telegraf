const dataTypes = {
  cpuUsage: "cpuUsage",
  memoryUsage: "memoryUsage",
  diskUsage: "diskUsage",
  numberProcesses: "numberProcesses",
};

const notificationMetrics = {
  cpu: process.env.NOTIFCATION_CPU ?? 70,
  diskUsage: process.env.NOTIFICATION_DISK ?? 70,
  memory: process.env.NOTIFCATION_MEMORY ?? 70,
  processes: process.env.NOTIFCATION_PROCESSES ?? 100,
};


module.exports = {
  dataTypes,
  notificationMetrics
};
