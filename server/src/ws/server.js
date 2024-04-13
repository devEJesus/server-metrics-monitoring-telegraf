const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

async function sendDataToClients(type, data) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify({ type, data }));
    });
}

module.exports = {
    wss,
    sendDataToClients
};
