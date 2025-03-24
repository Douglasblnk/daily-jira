import type { GithubPullRequest } from '@/types/github-pulls'

export function getNeedMyReviewPullRequests(pulls: GithubPullRequest[] = []) {
  return pulls.filter((pull) => {
    return pull.labels.every(label => label.name !== 'approved')
      && pull.requested_reviewers.some(reviewer => reviewer.login === 'Douglasblnk')
  })
}

export function getMyPullRequests(pulls: GithubPullRequest[] = []) {
  return pulls.filter(pull => pull.user.login === 'Douglasblnk')
}

export function getPriorityPullRequests(pulls: GithubPullRequest[] = []) {
  return pulls.filter(pull => pull.labels.some(label => label.name === 'priority'))
}

export function getApprovedPullRequests(pulls: GithubPullRequest[] = []) {
  return pulls.filter(pull => pull.labels.some(label => label.name === 'approved'))
}

// Counts

export function getAllOpenPullRequestsCount(pulls: GithubPullRequest[] = []) {
  return pulls.filter(pull => pull.state === 'open').length
}

export function getNeedMyReviewPullRequestsCount(pulls: GithubPullRequest[] = []) {
  return getNeedMyReviewPullRequests(pulls).length
}

export function getMyPullRequestsCount(pulls: GithubPullRequest[] = []) {
  return getMyPullRequests(pulls).length
}

export function getPriorityPullRequestsCount(pulls: GithubPullRequest[] = []) {
  return getPriorityPullRequests(pulls).length
}

export function getApprovedPullRequestsCount(pulls: GithubPullRequest[] = []) {
  return getApprovedPullRequests(pulls).length
}
