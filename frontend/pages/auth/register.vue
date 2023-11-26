<template>
    <div class="auth-wrapper">
        <div class="auth-inputWrapper">
            <p class="inputTitle">EVgagement manager</p>
            <div class="inputs">
                <input type="text" placeholder="Username" v-model="username">
                <input type="text" placeholder="E-mail" v-model="email">
                <input type="password" placeholder="Password" v-model="password">
                <button class="login-button" @click="register()">Register</button>
            </div>
            <p class="errorMessage">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useTokenState } from "~/stores/authStore.js";
export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            errorMessage: "",
            token: useTokenState(),
        }
    },
    methods: {
        async register() {
            try {
                const res = await axios.post(`http://${window.location.hostname}:8080/auth/register`, {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                });
                this.token.setToken(res.data.token);
                this.$router.push("/auth/login");
            } catch (err) {
                this.errorMessage = err.response.data.message;
            }
        }
    }
}
</script>

<style scoped>
.auth-wrapper {
    height: calc(100vh);
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("https://images.squarespace-cdn.com/content/v1/55b5f693e4b0cb0617cd9116/1438694306022-5UD4R24JREQGW9XE4LZ3/vmware-partner-link-bg-w-logo.png");
    background-size: cover;
}

/* input */
.auth-inputWrapper {
    background: white;
    padding: 30px;
    border-radius: 20px;
    width: 500px;
}

.inputTitle {
    font-size: clamp(1rem, 5vw, 1.5rem);
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

/* input fields */
.inputs {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    outline: none;
    font-size: 1.2rem;
}

.login-button {
    padding: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    font-size: 1.2rem;
    background: #1e90ff;
    color: white;
    cursor: pointer;
}

.login-button:hover {
    background: #1a7adb;
}

/* error message */
.errorMessage {
    color: red;
    font-size: 1.1rem;
}
</style>