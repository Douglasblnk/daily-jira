import { defineStore } from 'pinia'

export const useGithubStore = defineStore('github-store', {
  state: () => ({
    option: 'review',
  }),
})
