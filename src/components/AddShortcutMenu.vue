<script setup lang="ts">
import type { QMenu } from 'quasar'
import { checkIsLink } from '@/utils'

const props = defineProps<{
  contextMenu?: boolean
  value?: string
}>()

const emit = defineEmits<{
  saveUrl: [value: string]
}>()

const url = ref(props.value)
const addShortcutMenuRef = ref<QMenu>()

const valideUrl = computed(() => checkIsLink(url.value))

function saveUrl() {
  if (url.value) {
    emit('saveUrl', url.value)
  }

  addShortcutMenuRef.value?.hide()
}

function onHide() {
  url.value = ''
}

function onShow() {
  if (props.value) {
    url.value = props.value
  }
}

defineExpose({
  addShortcutMenuRef,
})
</script>

<template>
  <QMenu
    ref="addShortcutMenuRef"
    cover
    :context-menu="contextMenu"
    @hide="onHide"
    @before-show="onShow"
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
          clearable
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
</template>
