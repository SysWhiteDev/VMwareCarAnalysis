<template>
    <div>
        <p class="title">General data</p>
        <DataTotalData />
        <div class="line">
            <DataRegionData />
        </div>
        <div class="line">
            <DataVehicleType />
        </div>
        <div class="line">
            <DataVehicleColors />
        </div>
        <div class="line">
            <DataVehicleOrientation />
        </div>
    </div>
</template> 

<style scoped>
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

.line:last-child {
    margin-bottom: 20px;
}
.line > * {
    flex: 0.5;
    margin-top: 0;
}
</style>