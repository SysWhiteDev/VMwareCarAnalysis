import { defineStore } from 'pinia'

export const useViewerTokenState = defineStore('token', {
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