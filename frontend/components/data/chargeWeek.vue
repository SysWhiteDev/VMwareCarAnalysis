<template>
    <div class="chargeRate">
        <GraphsLine name="This week's chargers uses" class="graph" :labels="labels" :data="data"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            data: [12, 19, 3, 5, 2, 3, 10],
        }
    }
}
</script>
<style scoped>
.chargeRate {
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.075);
    padding: 20px;
    border-radius: 20px;
    overflow: hidden;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
}

.graph {
    position: relative;
}
</style>