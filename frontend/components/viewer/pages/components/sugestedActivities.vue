<template>
    <div class="container">
        <p class="section-title"><i class="fa-solid fa-people-group"></i>Suggested activities</p>
        <div class="activities">
            <div class="activity notEv" v-if="!ev">
                <p>Your auto doesn't seem electric, please switch parking space.</p>
            </div>
            <div class="activity playgroud"
                v-else-if="((8 >= time.hours <= 12 || 15 >= time.hours <= 19) && temp >= 18) && kids && weather == 'sunny'">
                <p>What a nice day to go to the playground with the family.</p>
            </div>
            <div class="activity restaurant" v-else-if="(8 >= time.hours <= 12 || 15>= time.hours <= 19)">
                <p>Would you like a nice steak at NOISteria?</p>
            </div>
            <div class="activity coffee" v-else>
                <p>What a great time to get some coffee at the 24h coffee machine</p>
            </div>
        </div>
        <button @click="this.randomProps()">Randomize</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            temp: 18,
            weather: 'sunny',
            time: {},
            kids: false,
            ev: true,
        }
    },
    mounted() {
        this.getTime();
    },
    methods: {
        getTime() {
            const now = new Date();
            const timeObject = {
                hours: now.getHours(),
                minutes: now.getMinutes(),
                seconds: now.getSeconds()
            };
            this.time = timeObject;
        },
        randomProps(){
            this.ev = Boolean(Math.round(Math.random()));
            this.kids = Boolean(Math.round(Math.random()));
            this.time.hours = Math.floor(Math.random() * 25);
            this.weather = ['sunny', 'cloudy','rainy', 'windy', 'snowy'].sample();
            this.temp = Math.floor(Math.random() * 39);
        }
    }
}
</script>
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

.section-title>i {
    margin-right: 10px;
}

/* activity */
.activities {
    display: block;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    /* white-space: nowrap; */
    overflow: hidden;
    position: relative;
    /* transform: translateX(-100%); */
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

.notEv {
    background: black;
    background-size: cover;
}

.playgroud {
    background: url("https://t3.ftcdn.net/jpg/03/35/70/58/360_F_335705813_7yFQc6tKWw9jFIooRZVCA2tMudZXSaGP.jpg");
    background-size: cover;
}

.restaurant {
    background: url("https://www.creativefabrica.com/wp-content/uploads/2023/08/31/Ultra-Realistic-Photo-Of-A-Restaurant-On-Rooftop-78202123-1.png");
    background-size: cover;
}

.coffee {
    background: url("https://img.freepik.com/free-photo/fresh-coffee-steams-wooden-table-close-up-generative-ai_188544-8923.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699488000&semt=sph");
    background-size: cover;
}

.activity>p {
    font-size: clamp(1.2rem, 4vw, 1.6rem);
    font-weight: bold;
    /* color: white; */
    margin-right: 20px;
    position: absolute;
    bottom: 20px;
    color: black;
    padding: 5px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.752);
}
</style>