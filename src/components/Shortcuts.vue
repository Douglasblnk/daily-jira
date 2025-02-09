<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { QMenu } from 'quasar'

const shortcuts = useStorage<{
  ico: string
  url: string
}[]>('shortcuts', [])

const editShortcutRef = ref<QMenu[]>()
const editingShortcutRef = ref<{ addShortcutMenuRef: QMenu }[]>()

function saveShortcut(value: string) {
  shortcuts.value.push({
    ico: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${value}&size=48`,
    url: value,
  })
}

function updateShortcut(value: string, index: number) {
  shortcuts.value.splice(index, 1, {
    ico: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${value}&size=48`,
    url: value,
  })
}

function editShortcut(index: number) {
  editShortcutRef.value?.[index]?.hide()

  editingShortcutRef.value?.[index]?.addShortcutMenuRef?.show()
}

function deleteShortcut(index: number) {
  shortcuts.value.splice(index, 1)

  editShortcutRef.value?.[index]?.hide()
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
      v-for="(shortcut, index) in shortcuts"
      :key="`shortcuts-${index}`"
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

      <QMenu
        ref="editShortcutRef"
        touch-position
        context-menu
      >
        <QList un-space-y-xs>
          <QItem
            v-ripple
            clickable
            @click="editShortcut(index)"
          >
            <QItemSection avatar>
              <i
                class="i-mdi-pencil-outline"
                un-text-md
              />
            </QItemSection>

            <QItemSection un-font-bold>
              Editar
            </QItemSection>
          </QItem>

          <QItem
            v-ripple
            clickable
            @click="deleteShortcut(index)"
          >
            <QItemSection avatar>
              <i
                class="i-mdi-trash-can-outline"
                un-text-md
              />
            </QItemSection>

            <QItemSection un-font-bold>
              Excluir
            </QItemSection>
          </QItem>
        </QList>
      </QMenu>

      <AddShortcutMenu
        ref="editingShortcutRef"
        context-menu
        :value="shortcut.url"
        @save-url="updateShortcut($event, index)"
      />
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

      <AddShortcutMenu @save-url="saveShortcut" />
    </QBtn>
  </div>
</template>
