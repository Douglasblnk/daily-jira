import type { GithubPullRequest } from '@/types/github-pulls'
import { octokit } from '@/services/octokit'

export async function getAllPullRequests() {
  return octokit.paginate<GithubPullRequest>('GET /repos/{owner}/{repo}/pulls', {
    owner: 'multiplierx',
    repo: 'front',
    per_page: 100,
  })
}
