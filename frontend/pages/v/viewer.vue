<template>
    <div class="wrapper">
        <div class="code-wrapper" v-if="!token.token">
            <p>Useful code</p>
            <p class="code">{{ code }}</p>
            <NuxtLink to="/auth/login" class="admin-link">Admin panel</NuxtLink>
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
            codeCookie: useCookie("code"),
            firstTime: true,
            token: useViewerTokenState(),
            tokenCookie: useCookie("token"),
        }
    },
    mounted() {
        // set token state from cookie if exists
        if (this.tokenCookie && this.codeCookie) {
            this.token.token = this.tokenCookie;
            this.code = this.codeCookie;
        }

        const getCodeInterval = setInterval(() => {
            if (!this.token.token) {
                this.getCode();
            } else {
                clearInterval(getCodeInterval);
                this.reloadInterval = 6000;
                this.handleFileUpload();
            }
        }, 1000);
        const uploadInterval = setInterval(() => {
            if (this.token.token) {
                this.handleFileUpload();
            } else {
                clearInterval(uploadInterval);
            }
        }, 6000);
    },
    methods: {
        async getCode() {
            await axios.post(`http://${window.location.hostname}:8080/v/status`, {
                firstTime: this.firstTime,
            }, {
                headers: {
                    'id': this.code,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                this.firstTime = false;
                if (res.data.id) {
                    this.code = res.data.id;
                    if (!this.tokenCookie) {
                        this.codeCookie = res.data.id;
                    }

                }
                if (res.data.token) {
                    this.token.token = res.data.token;
                    this.tokenCookie = res.data.token;
                }
            }).catch((err) => {
                // console.log(err);
            })
        },
        async handleFileUpload() {
            // Access the webcam
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            // Create a new image capturer
            const track = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);

            imageCapture.takePhoto().then(blob => {
                // Send the buffer to the API endpoint
                const formData = new FormData();
                formData.append('image', blob, 'image.jpg');
                axios.post(`http://${window.location.hostname}:8081/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'code': this.code,
                    },
                })
                    .then(response => {
                        this.callModelReload();
                    })
                    .catch(error => {
                        // handle error
                        console.error(error);
                    });
            })
        },
        callModelReload() {
            axios.post(`http://${window.location.hostname}:8081/process`)
                .then(response => {
                    // console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
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

.admin-link {
    position: absolute;
    bottom: 0;
    right: 0;
    color: rgba(0, 0, 0, 0.278);
    font-size: 1.2rem;
    text-decoration: underline;
    cursor: pointer;
}
</style>