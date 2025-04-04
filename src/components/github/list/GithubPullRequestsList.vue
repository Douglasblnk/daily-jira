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
      un-h="xl:54vh 52vh"
    />

    <template v-else>
      <div
        v-if="!pulls?.length"
        un-text="center lg gray-text"
        un-font-bold
        un-mt-xl
      >
        Nem Pull Request encontrado.
      </div>

      <QVirtualScroll
        v-else
        v-slot="{ item, index }"
        un-h="xl:54vh 52vh"
        un-bg-transparent
        un-pr-sm
        virtual-scroll-item-size="100"
        :items="pulls"
      >
        <GithubPullCard
          :key="item.id + index"
          :pull="item"
          un-bg="#2f313a/40"
          :un-opacity="item.draft ? '60' : '100'"
          clickable
        />
      </QVirtualScroll>
    </template>
  </div>
</template>
