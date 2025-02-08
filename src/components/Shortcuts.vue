<script lang="ts" setup>
import type { QMenu } from 'quasar'
import { checkIsLink } from '@/utils'

const url = ref()
const addShortcutMenuRef = ref<QMenu>()

const shortcuts = ref<Record<string, string>[]>([
  // {
  //   ico: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://facebook.com&size=48',
  //   url: 'https://facebook.com',
  // },
  // {
  //   ico: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://instagram.com&size=48',
  //   url: 'https://instagram.com',
  // },
  // {
  //   ico: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://youtube.com&size=48',
  //   url: 'https://youtube.com',
  // },
  // {
  //   ico: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://drive.google.com&size=48',
  //   url: 'https://drive.google.com',
  // },
  // {
  //   ico: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://netflix.com&size=48',
  //   url: 'https://netflix.com',
  // },
])

const valideUrl = computed(() => checkIsLink(url.value))

function saveUrl() {
  shortcuts.value.push({
    ico: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url.value}&size=48`,
    url: url.value,
  })

  addShortcutMenuRef.value?.hide()
}

function onHide() {
  url.value = ''
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

      <QMenu
        ref="addShortcutMenuRef"
        cover
        @hide="onHide"
      >
        <QCard un-w-100>
          <QCardSection
            un-text="lg center"
            un-font-bold
          >
            Adicionar atalho
          </QCardSection>

          <QCardSection
            un-text-md
            un-font-bold
            un-flex
            un-gap-sm
          >
            <QInput
              v-model="url"
              outlined
              style="flex-grow: 1;"
              hide-bottom-space
              hide-hint
              label="URL"
            />

            <QBtn
              un-bg-positive
              :disable="!valideUrl"
              @click="saveUrl"
            >
              Salvar
            </QBtn>
          </QCardSection>
        </QCard>
      </QMenu>
    </QBtn>
  </div>
</template>
