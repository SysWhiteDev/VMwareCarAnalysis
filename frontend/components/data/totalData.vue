<template>
    <div class="wrapper">
        <div class="data">
            <p style="color: #3e7da6;">{{ totalChargers }}</p>
            <p>Total chargers</p>
        </div>
        <div class="data">
            <p style="color: #63b343;">{{ earning }}$</p>
            <p>Total estimated earnings</p>
        </div>
        <div class="data">
            <p style="color: #5cc4ca;">{{ (earning / 0.07).toFixed(2) }}kWh</p>
            <p>Total energy used</p>
        </div>
        <div class="data">
            <p style="color: #ee82ee;">{{ acc }}%</p>
            <p>Current model accuracy</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useTokenState } from '../stores/authStore.js';
export default {
    data() {
        return {
            totalChargers: 0,
            token: useTokenState(),
            earning: 68.92,
            acc: 79.68,
        }
    },
    mounted() {
        this.getChargers();
        this.getData();
    },
    methods: {
        async getChargers() {
            await axios.get('http://localhost:8080/v/getList', {
                headers: {
                    'Authorization': this.token.token,
                },
            }).then((res) => {
                this.totalChargers = res.data.length;
            }).catch((err) => {
                console.log(err);
            });
        },
        async getData() {
            const res = await axios.get("http://localhost:8081/");
            const dataMap = new Map();
            console.log(res.data)
            for (const element of res.data) {
                if (!this.labels.includes(element.acc)) {
                    this.labels.push(element.acc);
                }
                dataMap.set(element.acc, (dataMap.get(element.acc) || 0) + 1);
            }

            this.data = Array.from(dataMap.values());
            let sum = 0;
            res.data.forEach(element => {
                sum += element.acc;
            });
            console.log(sum)
        }
    }
}
</script>

<style scoped>
.wrapper {
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.075);
    padding: 20px;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px;
}

.data>p:first-child {
    font-size: 4rem;
    font-weight: bold;
    text-align: center;
}

.data>p:last-child {
    font-size: 1.4rem;
    text-align: center;
}
</style>