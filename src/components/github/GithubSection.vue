<script setup lang="ts">
import type { GithubPullRequest } from '@/types/github-pulls'
import { getApprovedPullRequests, getMyPullRequests, getNeedMyReviewPullRequests, getPriorityPullRequests } from '@/utils/github'

const { data, isPending, refetch } = useQuery({
  queryKey: [ 'pull-requests' ],
  queryFn: getAllPullRequests,
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
</script>

<template>
  <div un-space-y-md>
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
        @refetch="refetch"
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
          :pulls="data"
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
        <GithubPullRequestsList
          :title="pullRequestsTitle[store.option]"
          :pulls="mappedPullRequests"
          :is-loading="isPending"
        />
      </div>
    </div>
  </div>
</template>
