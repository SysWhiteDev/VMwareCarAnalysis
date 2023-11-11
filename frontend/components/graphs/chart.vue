<template>
    <Bar class="chart" :options="chartOptions" :data="chartData" />
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    props: {
        name: String,
        labels: Array,
        data: Array
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
