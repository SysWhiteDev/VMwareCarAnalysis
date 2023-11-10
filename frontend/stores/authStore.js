import { defineStore } from 'pinia'

export const useTokenState = defineStore('token', {
  state: () => ({
    token: '',
  }),
  getters: {
    getToken() {
      return this.token
    },
  },
  actions: {
    setToken(token) {
      this.token = token
    },  
  },
});