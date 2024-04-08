const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "edgar",
  host: "localhost",
  port: 5432,
  database: "telegraf_data",
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
});

async function readCPUUsageFromDatabase(callback) {
  const client = await pool.connect(); // Get a client from the pool
  try {
    const query = `SELECT (100 - usage_idle) cpu_usage FROM cpu ORDER BY "time" DESC LIMIT 1`;
    const result = await client.query(query);
    callback(null, result.rows[0].cpu_usage.toFixed(2));
  } catch (err) {
    console.error("Error executing CPU query:", err);
    callback(err, null);
  } finally {
    client.release(); // Release the client back to the pool
  }
}

async function readMemoryUsageFromDatabase(callback) {
  const client = await pool.connect(); // Get a client from the pool
  try {
    const query = `SELECT used_percent FROM mem ORDER BY time DESC LIMIT 1`;
    const result = await client.query(query);
    callback(null, result.rows[0].used_percent.toFixed(2));
  } catch (err) {
    console.error("Error executing CPU query:", err);
    callback(err, null);
  } finally {
    client.release(); // Release the client back to the pool
  }
}

async function readDiskUsageFromDatabase(callback) {
  // Add logic to query disk usage from the database
}

async function readDataFromDatabase(type, callback) {
  switch (type) {
    case "cpuUsage":
      readCPUUsageFromDatabase(callback);
      break;
    case "memoryUsage":
      readMemoryUsageFromDatabase(callback);
      break;
    case "diskUsage":
      readDiskUsageFromDatabase(callback);
      break;
    default:
      callback(new Error("Invalid data type"), null);
      break;
  }
}

module.exports = {
  readDataFromDatabase,
};
