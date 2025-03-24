<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'
import { useVModel } from '@vueuse/core'
import { marked } from 'marked'

const props = defineProps<{
  pull: GithubPullRequest
}>()

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
  return preprocessBlockquote(marked.parse(props.pull.body) as string)
})
</script>

<template>
  <QMenu
    cover
    fit
    max-width="200px"
    un-bg-transparent
    un-border="1px solid primary"
    un-relative
  >
    <GithubPullCard
      :pull="pull"
      un-p-md
      un-mb="!none"
    />

    <QCard un-p-md>
      <QCardSection un-bg="#2f313a/50">
        <div v-html="pullBody" />
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
