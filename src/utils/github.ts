import type { GithubPullRequest } from '@/types/github-pulls'
import { dayjs, hasValue } from '.'

export function getNeedMyReviewPullRequests(pulls: GithubPullRequest[] = []) {
  return pulls.filter((pull) => {
    return pull.labels.every(label => label.name !== 'approved')
      && pull.requested_reviewers.some(reviewer => reviewer.login === 'Douglasblnk')
      && pull.user.type !== 'Bot'
  })
}

export function getMyPullRequests(pulls: GithubPullRequest[] = []) {
  return pulls.filter(pull => pull.user.login === 'Douglasblnk')
}

export function getPriorityPullRequests(pulls: GithubPullRequest[] = []) {
  return pulls.filter(pull =>
    pull.labels.some(label => label.name === 'priority')
    && pull.labels.every(label => label.name !== 'approved'),
  )
}

export function getApprovedPullRequests(pulls: GithubPullRequest[] = []) {
  return pulls
    .filter(pull => pull.labels.some(label => label.name === 'approved')
      || (pull.requested_reviewers.every(reviewer => reviewer.login !== 'Douglasblnk')
        && pull.user.login !== 'Douglasblnk'
      ),
    )
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

// Suggestions Calcs

const USER_SCORE: Record<string, number> = {
  fernandocm121: 1,
  Yurijpereira: 1.2,
  wafffllesss: 1.5,
  vinicenter: 0.7,
  devrocha: 0.5,
}

export function calcUserScore(pull: GithubPullRequest) {
  const user = pull.user.login

  return USER_SCORE[user]
}

export function calcPriorityScore(pull: GithubPullRequest) {
  const pr = pull.labels.find(label => label.name === 'priority' || label.name === 'simple')

  return hasValue(pr) ? 1.5 : 0
}

export function calcReviewsLeftScore(pull: GithubPullRequest) {
  const reviewsLeft = pull.requested_reviewers.length

  return reviewsLeft === 5 ? 0.5 : 1
}

const TYPE_LABELS: Record<string, number> = {
  'bug': 0.7,
  'chore': 0.4,
  'dependencies': 0.3,
  'documentation': 0.1,
  'feature': 0.6,
  'hotfix': 2,
  'refactor': 0.4,
  'release': 0.5,
  'style': 0.2,
  'technical debt': 0.2,
  'test': 0.2,
}

export function calcTypeScore(pull: GithubPullRequest) {
  return pull.labels.reduce((acc, label) => acc += TYPE_LABELS[label.name], 0)
}

export function calcSpentTimeScore(pull: GithubPullRequest) {
  const today = dayjs()
  const spentTime = dayjs(pull.created_at)

  const diff = today.diff(spentTime, 'd')

  return diff / 100
}

const SCOPES: Record<string, number> = {
  'core': 0.7,
  'customer': 0.5,
  'customers': 0.5,
  'customer-listing': 0.5,
  'customer-view': 0.5,
  'customer-registration': 0.5,
  'order': 0.4,
  'order-config': 0.3,
  'catalog': 0.4,
}

export function calcScopeScore(pull: GithubPullRequest) {
  const match = pull.title.match(/\(([^)]+)\)/)

  const scope = match ? match[1] : null

  return SCOPES[scope || ''] || 0
}

export async function calcPullSizeScore(pull: GithubPullRequest) {
  const response = await getPullRequestFiles(pull.number)

  const changedFiles = response.length
  const codeChanges = response.reduce((acc, file) => acc += file.changes, 0)

  const changedFilesScore = changedFiles / 20
  const codeChangesScore = codeChanges / 1000

  return {
    changedFiles,
    codeChanges,
    pullSizeScore: (changedFilesScore + codeChangesScore) / 2,
  }
}
