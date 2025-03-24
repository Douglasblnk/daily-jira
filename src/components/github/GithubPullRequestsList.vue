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
      un-h="xl:52vh 49vh"
    />

    <div
      v-else
      id="github-pulls-list"
      un-h="xl:52vh 50vh"
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
        <GithubPullCard
          :key="index"
          :pull="item"
          un-bg="#2f313a/40"
          :un-opacity="item.draft ? '60' : '100'"
          clickable
        />
      </QVirtualScroll>
    </div>
  </div>
</template>
