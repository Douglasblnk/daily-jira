import { hasValue } from '@/utils'
import { useStorage } from '@vueuse/core'

const firstAccess = useStorage<{ gistId?: string }>('first-access', {})
const showFirstAccessModal = ref(false)

export function useHandleFirstAccess() {
  function setup() {
    if (!hasValue(firstAccess.value)) {
      showFirstAccessModal.value = true
    }
  }

  function setGist(gistId: string) {
    firstAccess.value = {
      ...firstAccess.value,
      gistId,
    }

    showFirstAccessModal.value = false
  }

  async function createGist() {
    const response = await createShortcutGist()

    setGist(response.data.id!)
  }

  return {
    setup,
    showFirstAccessModal,
    firstAccess,
    setGist,
    createGist,
  }
}
