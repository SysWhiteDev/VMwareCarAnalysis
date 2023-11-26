<template>
    <div class="container" v-if="debug >= 5">
        <i class="fa-solid fa-xmark close-button" @click="this.debug = 0"></i>
        <p class="section-title"><i class="fa-solid fa-bug"></i>Debug</p>
        <div class="actions">
            <div class="action">
                <i class="fa-solid fa-upload"></i>
                <p>Upload sample video to the server</p>
            </div>
        </div>
    </div>
    <div class="clock" @click="this.debug++">
        {{ time }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            debug: 0,
        };
    },
    mounted() {
        setInterval(() => {
            this.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }, 1000);
    },
};
</script>

<style scoped>
.clock {
    position: relative;
    margin: 20px 20px 20px 20px;
    padding: 20px;
    border-radius: 20px;
    font-size: 4rem;
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.075);
    font-weight: bold;
    width: auto;
    user-select: none;
}

/* DEBUG */
.container {
    position: relative;
    margin: 20px 20px 0px 20px;
    padding: 20px;
    border-radius: 20px;
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.075);
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    max-width: 1200px;
}

/* section title */
.section-title {
    font-size: clamp(1.2rem, 4vw, 1.6rem);
    font-weight: bold;
    margin: 0px;
}

.section-title>i {
    margin-right: 10px;
}

/* actions */
.actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
}

.action {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    background: rgb(235, 235, 235);
    cursor: pointer;
    color: black;
    text-decoration: none;
}

.action>i {
    margin: 5px;
}

/* close button */
.close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: clamp(1.2rem, 4vw, 1.6rem);
    cursor: pointer;
}
</style>
