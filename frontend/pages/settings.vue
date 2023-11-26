<template>
    <div>
        <p class="title">Settings</p>
        <div class="section">
            <p class="section-title">Chargers</p>
            <div class="chargers-wrapper">
                <div v-for="(charger, index) in chargers" :key="charger" class="charger">
                    <div class="info">
                        <i class="fa-solid fa-plug icon"></i>
                        <div>
                            <p class="name">Charger {{ index }}</p>
                            <!-- <p class="location">{{ charger.location }}</p> -->
                        </div>
                    </div>
                    <div class="status">
                        <!-- <p>{{ charger.id }}</p> -->
                        <i class="fa-solid fa-trash delete-button" @click="deleteViewer(charger.id)"></i>
                    </div>
                </div>
                <NuxtLink to="/add/charger" class="charger">
                    <div class="info">
                        <i class="fa-solid fa-plus icon"></i>
                        <div>
                            <p class="name">Add a new charger</p>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <p class="title">ML Model</p>
        <div class="chargers-wrapper">
            <button @click="updateModel()" class="update-button" :class="{ success: updateButtonSuccess }"><i
                    class="fa-solid fa-arrows-rotate" v-if="!updateButtonSuccess"></i>
                <i class="fa-solid fa-check" v-else></i>{{ updateButtonText
                }}</button>
            <button @click="deleteCurrentModel()" class="update-button" :class="{ success: deleteButtonSuccess }"><i
                    class="fa-solid fa-trash-can" v-if="!deleteButtonSuccess"></i><i class="fa-solid fa-check"
                    v-else></i>{{ this.deleteButtonText
                    }}</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useTokenState } from '../stores/authStore.js';
import { useMlStore } from '~/stores/mlDataStore';
export default {
    data() {
        return {
            chargers: [
            ],
            token: useTokenState(),
            ml: useMlStore(),
            updateButtonText: 'Refresh model with newer data',
            updateButtonSuccess: false,
            deleteButtonText: 'Clear the database',
            deleteButtonSuccess: false,
        }
    },
    mounted() {
        this.getChargers();
    },
    methods: {
        async getChargers() {
            await axios.get('http://localhost:8080/v/getList', {
                headers: {
                    'Authorization': this.token.token,
                },
            }).then((res) => {
                this.chargers = res.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        async deleteViewer(id) {
            await axios.post('http://localhost:8080/v/delete', {
                viewerid: id,
            }, {
                headers: {
                    'Authorization': this.token.token,
                },
            }).then((res) => {
                console.log(res);
                this.getChargers();
            }).catch((err) => {
                console.log(err);
            });
        },
        async updateModel() {
            this.updateButtonText = 'Refreshing model... please wait, this might take a while';
            await axios.post("http://localhost:8081/process", {
                headers: {
                    'Authorization': this.token.token,
                },
            }).then((res) => {
                console.log(res);
                this.updateButtonSuccess = true;
                this.updateButtonText = 'Model updated';
                setTimeout(() => {
                    this.updateButtonSuccess = false;
                    this.updateButtonText = 'Refresh model with newer data';
                }, 2000);
            }).catch((err) => {
                console.log(err);
            })
        },
        async deleteCurrentModel() {
            await axios.post("http://localhost:8081/d", {
                headers: {
                    'Authorization': this.token.token,
                },
            }).then((res) => {
                this.deleteButtonSuccess = true;
                this.deleteButtonText = 'Database cleared';
                setTimeout(() => {
                    this.deleteButtonSuccess = false;
                    this.deleteButtonText = 'Clear the database';
                }, 2000)
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>

<style scoped>
.title {
    font-size: 30px;
    font-weight: bold;
    margin: 20px;
}

/* sections */
.section-title {
    font-size: 20px;
    font-weight: bold;
    margin: 20px;
}

/* charger section */
.chargers-wrapper {
    margin: 0px 20px;
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.07);
    border-radius: 20px;
    overflow: hidden;
}

.charger {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    color: black;
}

.charger:not(:last-child) {
    border-bottom: rgba(174, 174, 174, 0.114) 2px solid;
}

.charger:last-child {
    cursor: pointer;
}

.charger>.info {
    display: flex;
    align-items: center;
}

.charger>.info>div>.name {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0px;
}

.charger>.info>.icon {
    font-size: 2rem;
    padding: 10px;
    color: rgb(158, 158, 158);
    background: rgb(241, 241, 241);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
}

.charger>.status {
    margin-right: 20px;
}

/* delete button */
.delete-button {
    font-size: 1.4rem;
    padding: 10px;
    color: rgb(158, 158, 158);
    background: rgb(241, 241, 241);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.delete-button:hover {
    background: rgba(224, 224, 224, 0.663);
}

/* update-button */
.update-button {
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    font-size: 1.2rem;
    background: #1e90ff;
    color: white;
    cursor: pointer;
    margin-right: 0;
}

.update-button:hover {
    background: rgb(23, 120, 216);
}

.update-button>i {
    margin-right: 10px;
}

.update-button.success {
    background: #3ddb1a;
}
</style>