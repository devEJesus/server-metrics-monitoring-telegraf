const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  host: process.env.DB_HOST ?? "localhost",
  port: process.env.DB_PORT ?? "5432",
  database: process.env.DB_DATABASE ?? "telegraf_data",
  max: process.env.DB_MAX_CLIENTS ?? 10, // Maximum number of clients in the pool
  idleTimeoutMillis: process.env.DB_CLOSE_AFTER ?? 30000, // Close idle clients after 30 seconds
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
  const client = await pool.connect(); // Get a client from the pool
  try {
    const query = `SELECT "used_percent"  * 100 used_disk FROM disk ORDER BY time DESC LIMIT 1`;
    const result = await client.query(query);
    callback(null, result.rows[0].used_disk.toFixed(2));
  } catch (err) {
    console.error("Error executing Disk query:", err);
    callback(err, null);
  } finally {
    client.release(); // Release the client back to the pool
  }
}

async function readNumberProcessesFromDatabase(callback) {
  const client = await pool.connect(); // Get a client from the pool
  try {
    const query = `SELECT total FROM processes ORDER BY time DESC LIMIT 1`;
    const result = await client.query(query);
    callback(null, result.rows[0].total);
  } catch (err) {
    console.error("Error executing Processes query:", err);
    callback(err, null);
  } finally {
    client.release(); // Release the client back to the pool
  }
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
    case "numberProcesses":
      readNumberProcessesFromDatabase(callback);
      break;
    default:
      callback(new Error("Invalid data type"), null);
      break;
  }
}

module.exports = {
  readDataFromDatabase,
};
