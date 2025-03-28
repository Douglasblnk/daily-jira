<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'
import { formatRelativeTime, isTooBright } from '@/utils'
import { useClipboard } from '@vueuse/core'
import { Notify } from 'quasar'

defineProps<{
  pull: GithubPullRequest
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
      :pull="pull"
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
            <img :src="pull.user.avatar_url">
          </QAvatar>

          <div>
            {{ formatRelativeTime(pull.created_at) }}
          </div>
        </div>

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
      </QItemLabel>

      <QItemLabel
        un-font-bold
        un-text-base
      >
        {{ pull.title }}
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
            un-max-w-100px
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

    <!-- <QItemSection
      side
      un-flex
      un-justify-between
    >

    </QItemSection> -->
  </QItem>
</template>
