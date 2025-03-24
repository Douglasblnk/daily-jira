<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'

defineProps<{
  title: string
  pulls: GithubPullRequest[] | undefined
  isLoading: boolean
}>()
</script>

<template>
  <div un-space-y-md>
    <span
      un-text="md gray-text"
      un-font-bold
      un-mt-md
    >
      {{ title }}
    </span>

    <GithubPullRequestListSkeleton
      v-if="isLoading"
      un-h="xl:52vh 44vh"
    />

    <div
      v-else
      id="github-pulls-list"
      un-h="xl:52vh 44vh"
      un-overflow-auto
    >
      <QVirtualScroll
        v-slot="{ item, index }"
        scroll-target="#github-pulls-list"
        un-bg-transparent
        un-pr-sm
        virtual-scroll-item-size="100"
        :items="pulls"
      >
        poxa vida
      </QVirtualScroll>
    </div>
  </div>
</template>
