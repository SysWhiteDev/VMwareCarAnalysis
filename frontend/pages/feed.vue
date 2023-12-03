<template>
    <div>
        <p class="title">Video feed</p>
        <div class="feeds" v-if="chargers.length != 0">
            <div class="feed" v-for="charger in chargers" :key="charger.id">
                <img :src="`http://${url}:8081/i/${charger.id}?rnd=${cachekey}`" alt="">
                <p>Charger {{ charger.id }}</p>
            </div>
        </div>
        <div class="notfound" v-else>
            <i class="fa-solid fa-video-slash"></i>
            <p>No charging stations found, maybe try adding one?</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useTokenState } from '../stores/authStore.js';
export default {
    data() {
        return {
            chargers: [],
            token: useTokenState(),
            url: window.location.hostname,
            cachekey: Math.random().toString(36).substring(7),
        }
    },
    mounted() {
        this.getChargers();
        setInterval(() => {
            this.cachekey = Math.random().toString(36).substring(7);
        }, 6000);
    },
    methods: {
        async getChargers() {
            await axios.get(`http://${window.location.hostname}:8080/v/getList`, {
                headers: {
                    'Authorization': this.token.token,
                },
            }).then((res) => {
                this.chargers = res.data;
            }).catch((err) => {
                console.log(err);
            });
        },
    },
}
</script>

<style scoped>
.title {
    font-size: 30px;
    font-weight: bold;
    margin: 20px;
}

/* notfound */
.notfound {
    color: rgba(0, 0, 0, 0.625);
    font-size: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 40px 0px;
    height: calc(100vh - 200px);
}

.notfound>p {
    font-size: 1.6rem;
    margin-top: 20px;
}

.notfound>p>a {
    color: rgba(0, 0, 0, 0.625);
}

/* feeds */
.feeds {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-evenly; */
    /* align-items: center; */
    margin: 0px 10px;
}

.feed {
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 7px;
    margin: 10px 10px;
    margin-top: 0;
}

.feed>img {
    width: auto;
    height: 300px;
    size: cover;
    border-radius: 7px;
}

.feed>p {
    margin-top: 10px;
    font-size: 1.2rem;
}
</style>