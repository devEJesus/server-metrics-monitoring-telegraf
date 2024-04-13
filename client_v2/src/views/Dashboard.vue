<script setup>
import { onMounted, ref } from 'vue';

var valCpu = ref('0.00%');
var valMem = ref('0.00%');
var valDisk = ref('0.00%');
var valProcesses = ref('0');

var ws = ref(null);
var connected = ref(false);

var series = ref([
    {
        name: 'CPU',
        data: []
    },
    {
        name: 'Memory',
        data: []
    }
]);

const chartOptions = ref({
    chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: 2000
            }
        },
        toolbar: {
            show: false
        }
    },
    xaxis: {
        type: 'datetime',
        labels: {
            formatter: function (val) {
                return new Date(val).toLocaleTimeString();
            }
        }
    },
    yaxis: {
        max: 100
    },
    markers: {
        size: 0
    }
});

onMounted(() => {
    // WebSocket server URL
    const serverUrl = 'ws://localhost:8081';

    // Create a WebSocket instance
    ws.value = new WebSocket(serverUrl);

    // WebSocket event handlers
    ws.value.onopen = () => {
        console.log('Connected to WebSocket server');
        connected.value = true;
    };

    ws.value.onmessage = (event) => {
        const message = JSON.parse(event.data); // Parse the received message as JSON
        const type = message.type;
        const data = message.data;
        const x = new Date().getTime();
        const y = data;

        switch (type) {
            case 'cpuUsage':
                valCpu.value = data + '%'; // Update CPU usage display
                series.value[0].data.push({ x, y }); // Push CPU usage data to chart series
                break;
            case 'memoryUsage':
                valMem.value = data + '%';
                series.value[1].data.push({ x, y }); // Update MEM usage display
                break;
            case 'diskUsage':
                valDisk.value = data + '%';
                break;
            case 'numberProcesses':
                valProcesses.value = data;
                break;
            default:
                break;
        }
    };

    ws.value.onclose = () => {
        console.log('Disconnected from WebSocket server');
        connected.value = false;
    };

    ws.value.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
});
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">CPU</span>
                        <div class="text-900 font-medium text-xl">{{ valCpu }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <font-awesome-icon icon="microchip" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Memory</span>
                        <div class="text-900 font-medium text-xl">{{ valMem }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <font-awesome-icon icon="memory" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Disk</span>
                        <div class="text-900 font-medium text-xl">{{ valDisk }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <font-awesome-icon icon="hard-drive" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Processes</span>
                        <div class="text-900 font-medium text-xl">{{ valProcesses }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <font-awesome-icon icon="gears" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="grid">
        <div class="col-12 xl:col-12">
            <div class="card">
                <h5>Metrics</h5>
                <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
            </div>
        </div>
    </div>
</template>
