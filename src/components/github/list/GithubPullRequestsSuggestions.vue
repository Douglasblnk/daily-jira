<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'
import { hasValue } from '@/utils'
import { calcPriorityScore, calcPullSizeScore, calcReviewsLeftScore, calcScopeScore, calcSpentTimeScore, calcTypeScore, calcUserScore } from '@/utils/github'
import { useStorage } from '@vueuse/core'

const props = defineProps<{
  title: string
  pulls: GithubPullRequest[] | undefined
  isLoading: boolean
}>()

// Implementar localStorage para salvar os Prs do dia, revisando a lista diminui
// e não é adicionado mais para a sugestão até o dia seguinte

interface Suggestions {
  score: number
  pull: GithubPullRequest & {
    changedFiles: number
    codeChanges: number
  }
}

const suggestions = useStorage<Suggestions[]>('suggestions', [])

const suggestionLoading = ref()

async function createSuggestions(pulls?: GithubPullRequest[]) {
  if (hasValue(suggestions.value))
    return

  suggestionLoading.value = true

  const shuffledSuggestions = await Promise.all(
    (pulls || []).map(async (pull) => {
      const userScore = calcUserScore(pull)
      const priorityScore = calcPriorityScore(pull)
      const reviewsLeftScore = calcReviewsLeftScore(pull)
      const typeScore = calcTypeScore(pull)
      const spentTimeScore = calcSpentTimeScore(pull)
      const scopeScore = calcScopeScore(pull)

      const {
        changedFiles,
        codeChanges,
        pullSizeScore,
      } = await calcPullSizeScore(pull)

      const totalScore = typeScore
        + userScore
        + priorityScore
        + reviewsLeftScore
        + spentTimeScore
        + scopeScore
        + pullSizeScore

      return {
        score: +totalScore.toFixed(2),
        pull: {
          ...pull,
          changedFiles,
          codeChanges,
        },
      }
    }),
  )

  const sortedSuggestions = shuffledSuggestions.sort((a, b) => b.score - a.score).slice(0, 3)

  suggestions.value = sortedSuggestions

  suggestionLoading.value = false
}

watch(() => props.pulls, createSuggestions)
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
      v-if="isLoading || suggestionLoading"
      un-h="xl:54vh 52vh"
    />

    <template v-else>
      <QVirtualScroll
        v-slot="{ item, index }"
        un-h="xl:54vh 52vh"
        un-bg-transparent
        un-pr-sm
        virtual-scroll-item-size="260"
        :items="suggestions"
      >
        <GithubPullCardCondensed
          :key="item.pull.id + index"
          :suggestions="item"
          un-bg="#2f313a/40"
          :un-opacity="item.draft ? '60' : '100'"
          clickable
        />
      </QVirtualScroll>
    </template>
  </div>
</template>
