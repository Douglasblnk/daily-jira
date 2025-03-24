<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'
import { getAllOpenPullRequestsCount } from '@/utils/github'

defineProps<{
  pulls: GithubPullRequest[] | undefined
  isLoading: boolean
}>()

const emit = defineEmits<{
  refetch: []
}>()
</script>

<template>
  <div
    un-text="4xl gray-text"
    un-font-bold
    un-flex
    un-items-center
    un-gap-sm
  >
    <i class="i-mdi-github" />

    <span>GitHub</span>

    <QSkeleton
      v-if="isLoading"
      un-w-200px
      un-h-20px
      un-mt-12px
    />

    <span
      v-else
      un-text="md gray-text/40"
      un-mt-12px
    >
      {{ getAllOpenPullRequestsCount(pulls) }} Pull Requests
    </span>
  </div>

  <div
    un-text="2xl gray-text"
    un-absolute
    un-top--1
    un-right-3
    un-cursor-pointer
    @click="emit('refetch')"
  >
    <i class="i-mdi-reload" />
  </div>

  <GithubPullsOptions
    :pulls="pulls"
    :is-loading="isLoading"
  />
</template>
