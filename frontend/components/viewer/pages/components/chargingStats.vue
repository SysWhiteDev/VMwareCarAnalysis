<template>
    <div class="container">
        <div class="data">
            <p>0h 33m</p>
            <p>Time left</p>
        </div>
        <div class="data">
            <p  style="color: rgb(92, 196, 202);">94w</p>
            <p>Current wattage</p>
        </div>
        <div class="data">
            <p  style="color: rgb(192, 26, 70);">67%</p>
            <p>Charged</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    position: relative;
    margin: 20px 20px 0px 20px;
    padding: 20px;
    border-radius: 20px;
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.075);
    display: flex;
    flex-direction: row;
    width: calc(100% - 40px);
    max-width: 1200px;
}

.data:not(:last-child) {
    margin-right: 60px;
}
.data > p:first-child {
    font-size: 2rem;
    font-weight: bold;
    margin: 0px;
}
</style>