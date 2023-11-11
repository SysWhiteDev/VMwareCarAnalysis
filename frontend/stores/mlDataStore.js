import { defineStore } from 'pinia'

export const useMlStore = defineStore('token', {
  state: () => ({
    data: [],
  }),
});