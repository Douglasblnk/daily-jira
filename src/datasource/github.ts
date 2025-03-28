import type { GithubPullRequest } from '@/types/github-pulls'
import { octokit } from '@/services/octokit'

export async function getAllPullRequests() {
  return octokit.paginate<GithubPullRequest>('GET /repos/{owner}/{repo}/pulls', {
    owner: 'multiplierx',
    repo: 'front',
    per_page: 100,
  })
}

export async function approvePullRequest(number: number) {
  return octokit.request('POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
    owner: 'multiplierx',
    repo: 'front',
    pull_number: number,
    event: 'APPROVE',
    body: 'LGTM',
  })
}

export async function createShortcutGist() {
  return octokit.request('POST /gists', {
    description: 'daily-jira-shortcuts',
    public: false,
    files: {
      'shortcuts.json': {
        content: '[]',
      },
    },
  })
}

export async function getGists() {
  return octokit.request('GET /gists')
}

export async function getGist(gistId?: string) {
  if (gistId) {
    return octokit.request('GET /gists/{gist_id}', {
      gist_id: gistId,
    })
  }
}

export async function updateGist(gistId: string, content: string) {
  await octokit.request('PATCH /gists/{gist_id}', {
    gist_id: gistId,
    description: 'daily-jira-shortcuts',
    files: {
      'shortcuts.json': {
        content,
      },
    },
  })
}
