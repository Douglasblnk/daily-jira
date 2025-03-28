<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'

const props = defineProps<{
  title: string
  pulls: GithubPullRequest[] | undefined
  isLoading: boolean
}>()

// Por usuário
// Por prioridade
// Por tipo
// Por tempo aberto
// Por autor

// Implementar localStorage para salvar os Prs do dia, revisando a lista diminui
// e não é adicionado mais para a sugestão até o dia seguinte

const suggestions = computed(() => {
  const shuffled = [ ...props.pulls?.filter(pull => !pull.draft) || [] ].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 3)
})
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
      <QVirtualScroll
        v-slot="{ item, index }"
        un-h="xl:54vh 52vh"
        un-bg-transparent
        un-pr-sm
        virtual-scroll-item-size="260"
        :items="suggestions"
      >
        <GithubPullCardCondensed
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
