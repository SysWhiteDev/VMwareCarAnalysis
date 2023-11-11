<template>
    <div class="container">
        <p class="title">{{title}}</p>
        <div>
            <GraphsPie class="graph" :labels="labels" :data="data" />
            <GraphsChart class="graph" :labels="labels" :data="data" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "Chargers per region",
            labels: ["Italy", "Germany", "Sweden"],
            data: [12, 19, 3],
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

.container > div {
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