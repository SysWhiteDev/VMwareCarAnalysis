<template>
    <div class="wrapper">
        <div class="code-wrapper" v-if="!token.token">
            <p>Useful code</p>
            <p class="code">{{ code }}</p>
        </div>
        <div v-else>
            <ViewerPages />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useViewerTokenState } from "~/stores/viewerAuthStore";
export default {
    data() {
        return {
            code: "000000",
            firstTime: true,
            token: useViewerTokenState(),
        }
    },
    mounted() {
        setInterval(() => {
            if (!this.token.token) {
                this.getCode();
            }
        }, 500);
    },
    methods: {
        async getCode() {
            await axios.post('http://172.20.10.11:8080/v/status', {
                firstTime: this.firstTime,
            }, {
                headers: {
                    'id': this.code,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                this.firstTime = false;
                this.code = res.data.id;
                if (res.data.token) {
                    this.token.token = res.data.token;
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
.wrapper {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.code-wrapper {
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.075);
    padding: 20px;
    border-radius: 20px;
    font-size: 2rem;
    text-align: center;
}

.code {
    font-size: 4rem;
    font-weight: bold;
}
</style>