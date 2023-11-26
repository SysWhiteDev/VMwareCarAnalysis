<template>
    <div class="wrapper">
        <div class="code-wrapper">
            <p>Insert the code displayed on your new charging station</p>
            <input type="text" v-model="code" class="code-input" placeholder="012345" maxlength="6"
                @input="() => { code = code.replace(/[^0-9]/g, '') }">
            <button class="code-button" @click="confirmCode()">Confirm</button>
            <p class="errorMessage">{{ error }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useTokenState } from "../stores/authStore";
export default {
    data() {
        return {
            code: '',
            success: false,
            error: '',
            loading: false,
            token: useTokenState(),
        }
    },
    moutned() {
        this.error = '';
    },
    methods: {
        async confirmCode() {
            if (this.code.length === 6) {
                const response = await axios.post(`http://${window.location.hostname}:8080/v/claim`,
                    {
                        'viewerid': this.code,
                    },
                    {
                        headers: {
                            'id': this.token.token,
                            'Authorization': this.token.token,
                        },
                    }
                ).then((res) => {
                    this.$router.push('/settings');
                }).catch((err) => {
                    this.error = JSON.parse(err.request.response).error;
                });
            }
        }
    },
}
</script>
<style scoped>
.wrapper {
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.code-wrapper {
    background: white;
    color: black;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.075);
    padding: 20px;
    border-radius: 20px;
    width: 500px;
}

.code-wrapper>p {
    font-size: 1.4rem;
    text-align: center;
    font-weight: bold;
}

.code-input {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin: 10px 0px;
    margin-top: 20px;
    padding: 0px 20px;
    font-size: 1.2rem;
    outline: none;
    text-align: center;
}

.code-button {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: none;
    /* margin: 20px 0px; */
    padding: 0px 20px;
    font-size: 1.2rem;
    outline: none;
    text-align: center;
    background: #5cc4ca;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.code-button:hover {
    background: #4ab0b6;
}

/* error message */
.errorMessage {
    color: red;
    font-size: 1.1rem !important;
    text-align: left !important;
}
</style>