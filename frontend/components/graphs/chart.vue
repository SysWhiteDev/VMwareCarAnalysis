<template>
    <Bar class="chart" :options="chartOptions" :data="chartData" :height="height" :width="width" />
</template>
  
<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)
export default {
    name: 'LineChart',
    props: {
        name: String,
        labels: Array,
        data: Array,
    },
    components: { Bar },
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
