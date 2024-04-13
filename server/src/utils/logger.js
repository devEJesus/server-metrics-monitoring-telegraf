function error(message) {
  write(message, "error");
}

function info(message) {
  write(message, "info");
}

function debug(message){
  write(message,'debug')
}

function write(message, level = "info") {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
}

module.exports = { error, info, debug };
