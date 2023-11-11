<template>
    <Pie class="chart" :options="chartOptions" :data="chartData" :width="width" :height="height" />
</template>
 
<script>
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: 'PieChart',
    props: {
        name: String,
        labels: Array,
        data: Array,
    },
    components: { Pie },
    data() {
        return {
            chartData: {
                labels: this.labels,
                datasets: [{
                    data: this.data,
                    backgroundColor: this.data.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16)),
                    borderWidth: 1
                }]
            },
            chartOptions: {
                responsive: true,
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
                        display: true,
                        position: 'right'
                    }
                }
            }
        }
    }
}
</script>
 