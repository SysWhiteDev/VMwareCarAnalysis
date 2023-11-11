<template>
    <div>
        <p class="title">General data</p>
        <DataTotalData />
        <div class="line">
            <DataChargeWeek name="test"/>
            <DataChargeWeek name="test"/>
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

.line > * {
    flex: 0.5;
    margin-top: 0;
}

.line > :first-child {
    margin-right: 0px;
}
</style>