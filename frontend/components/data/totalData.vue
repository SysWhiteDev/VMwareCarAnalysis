<template>
    <div class="wrapper">
        <div class="data">
            <p style="color: #3e7da6;">{{ totalChargers }}</p>
            <p>Total chargers</p>
        </div>
        <div class="data">
            <p style="color: #63b343;">0$</p>
            <p>Total estimated earnings</p>
        </div>
        <div class="data">
            <p style="color: #5cc4ca;">0W</p>
            <p>Total energy used</p>
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
        }
    },
    mounted() {
        this.getChargers();
    },
    methods: {
        async getChargers() {
            await axios.get('http://172.20.10.11:8080/v/getList', {
                headers: {
                    'Authorization': this.token.token,
                },
            }).then((res) => {
                this.totalChargers = res.data.length;
            }).catch((err) => {
                console.log(err);
            });
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