<script setup lang="ts">
useHandleFirstAccess().setup()

const $q = useQuasar()

$q.dark.set(true)
</script>

<template>
  <div un-p-md>
    <Shortcuts />
  </div>

  <div
    un-grid="~ cols-2 gap-lg"
    un-mt-2xl
    un-p-2xl
  >
    <QSpace />

    <GithubSection />
  </div>

  <FirstAccessModal />
</template>
