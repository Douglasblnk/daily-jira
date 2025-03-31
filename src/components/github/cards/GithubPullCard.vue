<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'
import { formatRelativeTime, isTooBright } from '@/utils'
import { useClipboard } from '@vueuse/core'
import { Notify } from 'quasar'

defineProps<{
  pull: GithubPullRequest & {
    changedFiles?: number
    codeChanges?: number
  }
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
    un-mb-sm
  >
    <GithubPullRequestDetails :pull="pull" />

    <QAvatar
      size="md"
      un-mr-sm
    >
      <img :src="pull.user.avatar_url">
    </QAvatar>

    <QItemSection
      un-space-y-sm
      un-flex
      un-items-start
    >
      <QChip
        v-if="pull.draft"
        un-font-bold
        un-text-md
        un-bg-draft
        dense
      >
        Draft
      </QChip>

      <QItemLabel
        un-font-bold
        un-text-md
      >
        {{ pull.title }}
      </QItemLabel>

      <QItemLabel>
        <div
          v-if="pull.changedFiles && pull.codeChanges"
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
            {{ pull.changedFiles }}
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
              {{ pull.codeChanges }}
            </span>
          </QBadge>
        </div>
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
            un-max-w-260px
            dense
            clickable
            :title="pull.base.ref"
            @click.stop="copyToClipboard(pull.base.ref)"
          >
            <span un-truncate>{{ pull.base.ref }}</span>
          </QChip>

          <i
            class="i-mdi-arrow-left-thin"
            un-text-md
          />

          <QChip
            un-text-branch-text
            un-bg-branch-bg
            un-truncate
            un-max-w-260px
            dense
            clickable
            :title="pull.head.ref"
            @click.stop="copyToClipboard(pull.head.ref)"
          >
            <span un-truncate>{{ pull.head.ref }}</span>
          </QChip>
        </div>
      </QItemLabel>

      <QItemLabel
        un-flex
        un-items-center
        un-gap-sm
      >
        <QBadge
          v-for="label in pull.labels"
          :key="label.id"
          :style="{ backgroundColor: `#${label.color}`, color: isTooBright(`#${label.color}`) ? 'black' : 'white' }"
        >
          {{ label.name }}
        </QBadge>
      </QItemLabel>
    </QItemSection>

    <QItemSection
      side
      un-flex
      un-justify-between
    >
      <QBtn
        un-ml-sm
        flat
        dense
        round
        :href="pull.html_url"
        @click.stop
      >
        <i
          class="i-mdi-open-in-new"
          un-text-md
        />
      </QBtn>

      <div>
        {{ formatRelativeTime(pull.created_at) }}
      </div>
    </QItemSection>
  </QItem>
</template>
