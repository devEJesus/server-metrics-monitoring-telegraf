<template>
    <Line id="TimeSeriesChart" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    name: 'TimeSeriesChart',
    components: { Line },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March'],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: [65, 59, 80],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            },
            chartOptions: {
                responsive: true
            }
        };
    }
};
</script>
