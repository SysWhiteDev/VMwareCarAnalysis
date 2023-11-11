<template>
    <Line class="chart" :options="chartOptions" :data="chartData" />
</template>
  
<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export default {
    name: 'LineChart',
    props: {
        name: String,
        labels: Array,
        data: Array
    },
    components: { Line },
    data() {
        return {
            chartData: {
                labels: this.labels,
                datasets: [{
                    data: this.data,
                    backgroundColor: '#5cc4ca32',
                    borderColor: '#5cc4ca',
                    borderWidth: 1
                }]
            },
            chartOptions: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: this.name,
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            }
        }
    }
}
</script>
