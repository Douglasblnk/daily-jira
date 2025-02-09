<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const shortcuts = useStorage<Record<string, string>[]>('shortcuts', [])

function saveUrl(value: string) {
  shortcuts.value.push({
    ico: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${value}&size=48`,
    url: value,
  })
}
</script>

<template>
  <div
    un-flex
    un-justify-center
    un-items-center
    un-gap-sm
    un-mt-7xl
  >
    <QBtn
      v-for="shortcut in shortcuts"
      :key="shortcut.ico"
      un-p="y-md x-lg"
      un-rounded-3xl
      un-cursor-pointer
      un-select-none
      un-transition="all"
      un-hover-bg="#2f313a/70"
      un-hover-translate-y--1
      un-hover-scale-105
      un-active-scale-100
      un-bg="#2f313a/30"
      un-flex
      un-justify-center
      un-items-center
      un-gap-lg
      flat
      :href="shortcut.url"
      :draggable="false"
    >
      <img
        un-w-10
        un-h-10
        :draggable="false"
        :src="shortcut.ico"
      >
    </QBtn>

    <QBtn
      un-p-sm
      un-rounded-2xl
      un-cursor-pointer
      un-select-none
      un-transition="all"
      un-hover-bg="#2f313a/70"
      un-bg-transparent
      un-hover-opacity-100
      un-active-scale-90
      un-flex
      un-justify-center
      un-items-center
      un-gap-lg
      :un-opacity="shortcuts.length ? 10 : 100"
      flat
    >
      <i
        class="i-mdi-plus"
        un-text="white 3xl"
      />

      <AddShortcutMenu @save-url="saveUrl" />
    </QBtn>
  </div>
</template>
