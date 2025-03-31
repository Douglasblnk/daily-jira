<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'
import { formatRelativeTime, isTooBright } from '@/utils'
import { useClipboard } from '@vueuse/core'
import { Notify } from 'quasar'

interface Suggestions {
  score: number
  pull: GithubPullRequest & {
    changedFiles: number
    codeChanges: number
  }
}

defineProps<{
  suggestions: Suggestions
}>()

const { copy } = useClipboard()

function copyToClipboard(value: string) {
  copy(value)

  Notify.create({
    message: 'Copiado para área de transferência',
    timeout: 3000,
    type: 'positive',
  })
}
</script>

<template>
  <QItem
    un-border="1px solid primary"
    un-mb-sm
  >
    <GithubPullRequestDetails
      :pull="suggestions.pull"
      max-width="600px"
    />

    <QItemSection
      un-space-y-sm
      un-flex
    >
      <QItemLabel
        un-flex
        un-justify-between
      >
        <div
          un-flex
          un-items-center
          un-gap-sm
        >
          <QAvatar
            size="md"
          >
            <img :src="suggestions.pull.user.avatar_url">
          </QAvatar>

          <div>
            {{ formatRelativeTime(suggestions.pull.created_at) }}
          </div>
        </div>

        <QBtn
          un-ml-sm
          flat
          dense
          round
          :href="suggestions.pull.html_url"
          @click.stop
        >
          <i
            class="i-mdi-open-in-new"
            un-text-md
          />
        </QBtn>
      </QItemLabel>

      <QItemLabel
        un-font-bold
        un-text-base
      >
        {{ suggestions.pull.title }}
      </QItemLabel>

      <QItemLabel
        un-flex
        un-items-center
      >
        <div
          un-flex
          un-items-center
          un-gap-xs
        >
          <QChip
            un-text-branch-text
            un-bg-branch-bg
            un-truncate
            un-max-w-100px
            dense
            clickable
            :title="suggestions.pull.base.ref"
            @click.stop="copyToClipboard(suggestions.pull.base.ref)"
          >
            <span un-truncate>{{ suggestions.pull.base.ref }}</span>
          </QChip>

          <i
            class="i-mdi-arrow-left-thin"
            un-text-md
          />

          <QChip
            un-text-branch-text
            un-bg-branch-bg
            un-truncate
            un-max-w-100px
            dense
            clickable
            :title="suggestions.pull.head.ref"
            @click.stop="copyToClipboard(suggestions.pull.head.ref)"
          >
            <span un-truncate>{{ suggestions.pull.head.ref }}</span>
          </QChip>
        </div>
      </QItemLabel>

      <QItemLabel
        un-flex
        un-justify-between
      >
        <div
          un-flex
          un-items-center
          un-gap-sm
        >
          <QBadge
            v-for="label in suggestions.pull.labels"
            :key="label.id"
            :style="{ backgroundColor: `#${label.color}`, color: isTooBright(`#${label.color}`) ? 'black' : 'white' }"
          >
            {{ label.name }}
          </QBadge>
        </div>

        <div
          un-flex
          un-items-center
          un-gap-xs
          un-text-xs
        >
          <QBadge
            un-flex
            un-items-center
            un-gap-xs
            un-bg-accent
            un-font-bold
          >
            <i class="i-mdi-file-multiple-outline" />
            {{ suggestions.pull.changedFiles }}
          </QBadge>

          <QBadge
            un-flex
            un-items-center
            un-gap-xs
            un-bg-approved-review
            un-font-bold
          >
            <i class="i-mdi-code-braces" />

            <span>
              {{ suggestions.pull.codeChanges }}
            </span>
          </QBadge>
        </div>
      </QItemLabel>
    </QItemSection>
  </QItem>
</template>
