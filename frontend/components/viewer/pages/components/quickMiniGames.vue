<template>
    <div class="container">
        <p class="section-title"><i class="fa-solid fa-gamepad"></i>Mini games</p>
        <div class="games">
            <NuxtLink to="/v/games/tictactoe" class="game">
                <img src="https://cdn.icon-icons.com/icons2/390/PNG/512/tic-tac-toe_39453.png" alt="">
                <p>TicTacToe</p>
            </NuxtLink>
            <!-- <NuxtLink to="/v/games/snake" class="game">
                <img src="https://static-00.iconduck.com/assets.00/connect-four-icon-512x449-cuxhc8ok.png" alt="">
                <p>Connect 4</p>
            </NuxtLink>
            <NuxtLink to="/v/games/snake" class="game">
                <img src="https://upload.wikimedia.org/wikipedia/en/0/0a/Flappy_Bird_icon.png" alt="">
                <p>Flappy bird</p>
            </NuxtLink> -->
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
.games {
    display: flex;
    align-items: center;
    background: rgb(235, 235, 235);
    padding: 20px;
    border-radius: 20px;
    margin-top: 10px;
}

.game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px 20px;
    cursor: pointer;
    color: black;
    text-decoration: none;
}

.game > img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    border-radius: 10px;
}
</style>