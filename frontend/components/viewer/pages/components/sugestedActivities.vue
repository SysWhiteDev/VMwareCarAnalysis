<template>
    <div class="container">
        <p class="section-title"><i class="fa-solid fa-people-group"></i>Suggested activities</p>
        <div class="activities">
            <div class="activity">
                <p>A walk in the nearby park</p>
            </div>
            <div class="activity">
                <p>A walk in the park</p>
            </div>
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
.section-title > i {
    margin-right: 10px;
}

/* activity */
.activities {
    display: block;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
}

.activity {
    display: inline-block;
    width: 100%;
    padding: 20px;
    margin-top: 0px;
    border-radius: 20px;
    background: url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Halleyparknovember.jpg/1200px-Halleyparknovember.jpg");
    background-size: cover;
    height: 200px;
   
}

.activity > p {
    font-size: clamp(1.2rem, 4vw, 1.6rem);
    font-weight: bold;
    /* color: white; */
    margin: 0px;
    position: absolute;
    bottom: 20px;
    color: black;
    padding: 5px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.752);
}
</style>