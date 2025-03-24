<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'

import {
  getApprovedPullRequestsCount,
  getMyPullRequestsCount,
  getNeedMyReviewPullRequestsCount,
  getPriorityPullRequestsCount,
} from '@/utils/github'

defineProps<{
  pulls: GithubPullRequest[] | undefined
  isLoading: boolean
}>()

const store = useGithubStore()

function selectOption(opt: string) {
  store.option = opt
}
</script>

<template>
  <div
    un-flex="~ wrap"
    un-gap-sm
  >
    <GithubPullsCountCard
      title="PRs para revisar"
      un-text-info
      :is-loading="isLoading"
      :class="store.option === 'review' ? 'selected-option' : 'opacity-50'"
      :count="getNeedMyReviewPullRequestsCount(pulls)"
      @click="selectOption('review')"
    />

    <GithubPullsCountCard
      title="PRs prioritários"
      un-text-negative
      :is-loading="isLoading"
      :class="store.option === 'priority' ? 'selected-option' : 'opacity-50'"
      :count="getPriorityPullRequestsCount(pulls)"
      @click="selectOption('priority')"
    />

    <GithubPullsCountCard
      title="PRs meus"
      un-text-positive
      :is-loading="isLoading"
      :class="store.option === 'mine' ? 'selected-option' : 'opacity-50'"
      :count="getMyPullRequestsCount(pulls)"
      @click="selectOption('mine')"
    />

    <GithubPullsCountCard
      title="PRs aprovados"
      un-text-approved
      :is-loading="isLoading"
      :class="store.option === 'approved' ? 'selected-option' : 'opacity-50'"
      :count="getApprovedPullRequestsCount(pulls)"
      @click="selectOption('approved')"
    />
  </div>
</template>

<style scoped lang="sass">
.selected-option
  background-color: var(--color-accent)
</style>
