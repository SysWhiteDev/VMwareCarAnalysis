<template>
    <div class="container">
        <p class="title">{{ title }}</p>
        <div>
            <GraphsPie class="graph" :labels="labels" :data="data" v-if="!data.length == 0"/>
            <GraphsChart class="graph" :labels="labels" :data="data" v-if="!data.length == 0"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            title: "Vehicle Colors",
            data: [],
            labels: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            const res = await axios.get("http://localhost:8081/");
            const dataMap = new Map();
            console.log(res.data)
            for (const element of res.data) {
                if (!this.labels.includes(element.color)) {
                    this.labels.push(element.color);
                }
                dataMap.set(element.color, (dataMap.get(element.color) || 0) + 1);
            }

            this.data = Array.from(dataMap.values());
            console.log(Array.from(dataMap.values()));
        }

    }

}
</script>

<style scoped>
.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;

}

.container {
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.075);
    padding: 20px;
    border-radius: 20px;
    overflow: hidden;
    /* height: 500px; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-direction: column;
    margin: 20px 20px 0px 20px;
    flex: 1 !important;
    padding: 20px;

}

.container>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex: 1 !important;
}

.container>div>* {
    /* width: 440px !important; */
    height: clamp(220px, 24vw, 440px) !important;
    margin: 0px clamp(30px, 10vw, 60px);
}
</style>