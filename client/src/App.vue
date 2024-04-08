<template>
  <div>
    <h1>WebSocket Client</h1>
    <div v-if="connected">
      <p>Connected to WebSocket server</p>
      <p v-if="message">Received message from server: {{ message }}</p>
    </div>
    <div v-else>
      <p>Connecting to WebSocket server...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      connected: false,
      message: null
    };
  },
  mounted() {
    // WebSocket server URL
    const serverUrl = 'ws://localhost:8081';

    // Create a WebSocket instance
    this.ws = new WebSocket(serverUrl);

    // WebSocket event handlers
    this.ws.onopen = () => {
      console.log('Connected to WebSocket server');
      this.connected = true;
    };

    this.ws.onmessage = (event) => {
      console.log('Received message from server:', event.data);
      this.message = event.data;
    };

    this.ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      this.connected = false;
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  },
  beforeUnmount() {
    // Close WebSocket connection when the component is unmounted
    if (this.ws) {
      this.ws.close();
    }
  }
};
</script>
