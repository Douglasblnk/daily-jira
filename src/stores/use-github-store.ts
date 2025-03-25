import { defineStore } from 'pinia'

function makeDefaultState() {
  return {
    option: 'review',
  }
}

export const useGithubStore = defineStore('github-store', {
  state: makeDefaultState,
  actions: {

  },
})
