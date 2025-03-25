<template>
  <div
    un-overflow-hidden
    un-space-y-sm
  >
    <QSkeleton
      v-for="item in 5"
      :key="item"
      un-h-30
      un-rounded-18px
    />
  </div>
</template>
