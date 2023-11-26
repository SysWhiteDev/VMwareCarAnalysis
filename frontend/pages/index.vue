<template>
    <div>
        <p class="title">General data</p>
        <div v-if="data.length != 0">
            <DataTotalData />
            <div class="line">
                <DataRegionData />
            </div>
            <div class="line">
                <DataVehicleType />
            </div>
            <!-- <div class="line">
                <DataVehicleColors />
            </div>
            <div class="line">
                <DataVehicleOrientation />
            </div> -->
        </div>
        <div class="notfound" v-else>
            <i class="fa-regular fa-circle-question"></i>
            <p>No data available, did you refresh the model in <NuxtLink to="/settings">settings</NuxtLink>?</p>
        </div>
    </div>
</template> 

<script>
import axios from 'axios';
export default {
    data() {
        return {
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

<style>
.title {
    font-size: 30px;
    font-weight: bold;
    margin: 20px;
}

/* layout */
.line {
    margin-top: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.line {
    margin-bottom: 20px;
}

.line>* {
    flex: 0.5;
    margin-top: 0;
}

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

@keyframes notfound {
    0% {
        transform: rotate(20deg);
    }

    100% {
        transform: rotate(380deg);
    }

}

.notfound > i {
    animation: notfound 20s infinite ease-in;
    transform: rotate(20deg);
}

.notfound > p {
    font-size: 1.6rem;
    margin-top: 20px;
}

.notfound > p > a {
    color: rgba(0, 0, 0, 0.625);
}
</style>