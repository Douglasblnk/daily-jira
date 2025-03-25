<script setup lang="ts">
defineProps<{
  title: string
  count: number
  isLoading: boolean
}>()
</script>

<template>
  <QBtn
    un-bg="#2f313a/40"
    un-rounded-full
    flat
    un-text-md
    un-font-bold
  >
    <QSkeleton
      v-if="isLoading"
      un-w-30
    />

    <span
      v-else
      un-select-none
    >
      {{ count }} {{ title }}
    </span>
  </QBtn>
</template>
