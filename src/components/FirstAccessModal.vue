<script setup lang="ts">
import { hasValue } from '@/utils'

const {
  showFirstAccessModal,
  setGist,
  createGist,
  firstAccess,
} = useHandleFirstAccess()

const isLoading = ref(false)

const { data, isPending } = useQuery({
  queryKey: [ 'get-gists' ],
  queryFn: getGists,
  enabled: computed(() => !hasValue(firstAccess.value)),
})

async function handleGist(gistID?: string) {
  if (gistID) {
    return setGist(gistID)
  }

  isLoading.value = true

  await createGist()

  isLoading.value = false
}
</script>

<template>
  <QDialog
    v-model="showFirstAccessModal"
    persistent
  >
    <div>
      <div
        un-p-lg
        un-w-full
        un-mb-sm
        un-space-y-md
        class="dialog-container"
      >
        <div
          un-text-lg
          un-flex
          un-items-center
          un-gap-sm
          un-font-bold
          un-text-branch-text
        >
          <i class="i-mdi-info-outline" />

          Configurar primeiro acesso.
        </div>

        <div
          un-text="!md/6 gray-text"
          un-font-bold
        >
          Os atalhos customizáveis guardam suas informação em um GIST no github.
        </div>
      </div>

      <div
        un-p-lg
        un-w-full
        un-mb-md
        un-space-y-md
        class="dialog-container"
      >
        <div
          v-if="isPending"
          un-text="md center"
          un-font-bold
          un-flex
          un-items-center
          un-justify-center
          un-gap-sm
        >
          <i class="i-mdi-loading animate-spin" />

          Buscando Gists...
        </div>

        <div v-else-if="data?.data.length">
          <div
            un-text="md/6 gray-text"
            un-mb-md
          >
            Alguns Gists foram encontrados. Selecione aquele que representa os atalhos a serem salvos ou crie um novo usando o botão abaixo.
          </div>

          <QBtn
            v-for="gist in data?.data"
            :key="gist.id"
            align="left"
            un-bg-primary
            un-rounded-2xl
            un-w-full
            un-mb-sm
            flat
            @click="handleGist(gist.id)"
          >
            <div
              un-font-bold
              un-text-start
            >
              {{ gist.description }}
            </div>
          </QBtn>
        </div>

        <div
          v-else
          un-text="md/6 gray-text"
        >
          Nenhum Gists foi encontrado. Crie um novo no botão abaixo.
        </div>
      </div>

      <div
        class="dialog-container"
        un-flex
        un-w-full
      >
        <QBtn
          un-bg-branch-bg
          un-grow
          un-font-bold
          flat
          :loading="isLoading"
          @click="handleGist()"
        >
          Criar
        </QBtn>
      </div>
    </div>
  </QDialog>
</template>

<style lang="sass" scoped>
.dialog-container
  border-radius: 24px
  backdrop-filter: blur(48px)
  background: rgba(35, 39, 43, 0.70)
  box-shadow: none
  border: 1px solid var(--color-dark-primary)
</style>
