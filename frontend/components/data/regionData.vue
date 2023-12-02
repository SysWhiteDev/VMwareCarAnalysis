<template>
    <div class="container">
        <p class="title">{{ title }}</p>
        <div>
            <GraphsPie class="graph" :labels="labels" :data="data" v-if="!data.length == 0" />
            <GraphsChart class="graph" :labels="labels" :data="data" v-if="!data.length == 0" />
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    data() {
        return {
            title: "Vehicle's Country of registration",
            data: [],
            labels: [],
            countryList: {
                it: "Italy",
                de: "Germany",
                fr: "France",
                es: "Spain",
                gb: "United Kingdom",
                pl: "Poland",
                nl: "Netherlands",
                be: "Belgium",
                ro: "Romania",
                se: "Sweden",
                cz: "Czech Republic",
                hu: "Hungary",
                pt: "Portugal",
                at: "Austria",
                "us-va": "United States - Virginia",
                "us-ca": "United States - California",
                "us-tx": "United States - Texas",
                "us-ny": "United States - New York",
                "us-fl": "United States - Florida",
                br: "Brazil",
                ca: "Canada",
                au: "Australia",
                jp: "Japan",
                in: "India",
                cn: "China",
                kr: "South Korea",
                mx: "Mexico",
                ar: "Argentina",
                cl: "Chile",
                za: "South Africa",
                ng: "Nigeria",
                eg: "Egypt",
                sa: "Saudi Arabia",
                ae: "United Arab Emirates",
                ru: "Russia",
                tr: "Turkey",
                ir: "Iran",
                iq: "Iraq",
                sy: "Syria",
                af: "Afghanistan",
                pk: "Pakistan",
                lk: "Sri Lanka",
                bd: "Bangladesh",
                np: "Nepal",
                th: "Thailand",
                vn: "Vietnam",
                id: "Indonesia",
                ph: "Philippines",
                sg: "Singapore",
                my: "Malaysia",
                nz: "New Zealand",
                za: "South Africa",
                eg: "Egypt",
                ke: "Kenya",
                et: "Ethiopia",
                dz: "Algeria",
                ma: "Morocco",
                tn: "Tunisia",
                sd: "Sudan",
                ly: "Libya",
                ug: "Uganda",
                cd: "Democratic Republic of the Congo",
                cm: "Cameroon",
                ga: "Gabon",
                sn: "Senegal",
                ci: "Côte d'Ivoire",
                ml: "Mali",
                bf: "Burkina Faso",
                lr: "Liberia",
                sl: "Sierra Leone",
                gw: "Guinea-Bissau",
                gn: "Guinea",
                gm: "The Gambia",
                bj: "Benin",
                tg: "Togo",
                gh: "Ghana",
                ng: "Nigeria",
                ne: "Niger",
                bf: "Burkina Faso",
                ee: "Estonia",
            }
        };
    },
    mounted() {
        setInterval(() => {
            this.getData();
        }, 1000);
    },
    methods: {
        async getData() {
            const res = await axios.get(`http://${window.location.hostname}:8081/`);
            const dataMap = new Map();

            for (const element of res.data) {
                let label = this.countryList[element.region] ? this.countryList[element.region] : element.region;
                if (!this.labels.includes(label)) {
                    this.labels.push(label);
                }
                dataMap.set(element.region, (dataMap.get(element.region) || 0) + 1);
            }


            this.data = Array.from(dataMap.values());
            console.log(Array.from(dataMap.values()));
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

.container>div {
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