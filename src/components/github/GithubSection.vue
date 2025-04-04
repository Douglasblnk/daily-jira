<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'
import { hasValue } from '@/utils'
import { calcScopeScore, getApprovedPullRequests, getMyPullRequests, getNeedMyReviewPullRequests, getPriorityPullRequests } from '@/utils/github'

const { firstAccess } = useHandleFirstAccess()

const { data, isPending } = useQuery({
  queryKey: [ 'pull-requests' ],
  queryFn: getAllPullRequests,
  enabled: computed(() => hasValue(firstAccess.value)),
})

const store = useGithubStore()

const pullRequestsTitle: Record<string, string> = {
  review: 'Para revisar',
  priority: 'Prioritários',
  mine: 'Meus',
  approved: 'Aprovados',
}

const mappedPullRequests = computed(() => {
  const pullRequestsMappers: Record<string, (pulls: GithubPullRequest[] | undefined) => GithubPullRequest[]> = {
    review: getNeedMyReviewPullRequests,
    priority: getPriorityPullRequests,
    mine: getMyPullRequests,
    approved: getApprovedPullRequests,
  }

  return pullRequestsMappers[store.option](data.value)
})

const suggestions = computed(() => {
  return getNeedMyReviewPullRequests(data.value).filter(pull => !pull.draft)
})
</script>

<template>
  <div un-space-y-sm>
    <div
      un-space-y-md
      un-bg="#2f313a/30"
      un-p-md
      un-rounded-3xl
      un-relative
    >
      <GithubOptionsSection
        :pulls="data"
        :is-loading="isPending"
      />
    </div>

    <div un-grid="~ cols-3 gap-sm">
      <div
        un-space-y-md
        un-bg="#2f313a/30"
        un-p-md
        un-rounded-3xl
        un-relative
      >
        <GithubPullRequestsSuggestions
          title="Sugestão de revisão"
          :pulls="suggestions"
          :is-loading="isPending"
        />
      </div>

      <div
        un-col-span="2"
        un-space-y-md
        un-bg="#2f313a/30"
        un-p-md
        un-rounded-3xl
        un-relative
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-in-out"
          leave-active-class="transition-all duration-200 ease-in-out"
          enter-from-class="opacity-0 blur-sm translate-x-10px"
          leave-to-class="opacity-0 blur-sm translate-x-10px"
          mode="out-in"
        >
          <GithubPullRequestsList
            :key="store.option"
            :title="pullRequestsTitle[store.option]"
            :pulls="mappedPullRequests"
            :is-loading="isPending"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>
