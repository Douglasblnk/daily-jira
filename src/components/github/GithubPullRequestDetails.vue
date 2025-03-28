<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'
import type { QMenu } from 'quasar'
import { useQueryClient } from '@tanstack/vue-query'
import { useVModel } from '@vueuse/core'
import { marked } from 'marked'

const props = defineProps<{
  pull: GithubPullRequest
}>()

const queryClient = useQueryClient()
const qMenuRef = ref<QMenu>()

function getBlockquoteType(html: string | undefined) {
  if (html?.includes('[!note]')) {
    return 'custom-info'
  }

  else {
    return 'custom-warning'
  }
}

function removeAlertsText(html: string) {
  if (html?.includes('[!note]')) {
    return html.replace('[!note]', '')
  }

  return html?.replace('[!warning]', '')
}

function preprocessBlockquote(md: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(md, 'text/html')

  const blockquotes = doc.querySelectorAll('blockquote')

  blockquotes.forEach((blockquote) => {
    const newDiv = doc.createElement('div')

    newDiv.classList.add(getBlockquoteType(blockquote?.innerHTML))
    newDiv.innerHTML = removeAlertsText(blockquote?.innerHTML || '')

    blockquote?.parentNode?.replaceChild(newDiv, blockquote)
  })

  return doc.body.innerHTML
}

const pullBody = computed(() => {
  return props.pull.body && preprocessBlockquote(marked.parse(props.pull.body) as string)
})

const { mutateAsync, isPending } = useMutation({
  mutationKey: [ 'approve-pr' ],
  mutationFn: async () => {
    await approvePullRequest(props.pull.number)
    await queryClient.invalidateQueries({ queryKey: [ 'pull-requests' ] })
  },
})

async function approvePr() {
  await mutateAsync()

  qMenuRef.value?.hide()
}

const canApprove = computed(() => {
  return props.pull.labels.every(label => label.name !== 'approved')
    && props.pull.requested_reviewers.some(reviewer => reviewer.login === 'Douglasblnk')
})
</script>

<template>
  <QMenu
    ref="qMenuRef"
    cover
    fit
    max-width="200px"
    un-border="1px solid primary"
    un-relative
  >
    <GithubPullCard
      :pull="pull"
      un-p-md
      un-mb="!none"
    />

    <QCard
      v-if="pullBody"
      un-p-md
    >
      <QCardSection un-bg="#2f313a/50">
        <div v-html="pullBody" />
      </QCardSection>
    </QCard>

    <QCard
      v-if="canApprove"
      un-sticky
      un-bottom--1
      style="background: linear-gradient(0deg, black, transparent);"
    >
      <QCardSection un-text-center>
        <QBtn
          label="Aprovar"
          un-w-col-6
          un-bg-approved-review
          :loading="isPending"
          @click="approvePr"
        />
      </QCardSection>
    </QCard>
  </QMenu>
</template>

<style lang="sass">
.custom-warning
  padding: 10px 15px
  border-left: 6px solid #f39c12
  background-color: #fcf3cf
  color: #8a6d3b
  border-radius: 12px
  margin: 20px 0
  font-family: sans-serif
  p
    margin: 0

.custom-info
  padding: 10px 15px
  border-left: 6px solid #4069c6
  background-color: #e8eefc
  color: #2c3e91
  border-radius: 12px
  margin: 20px 0
  font-family: sans-serif
  p
    margin: 0
</style>
