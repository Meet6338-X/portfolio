export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

// Fetch pinned repos via GitHub GraphQL API (requires token for pinned)
// Falls back to top starred repos for public access
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  if (!username) return [];

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-app',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // Try to get pinned repos via GraphQL (requires token)
    if (process.env.GITHUB_TOKEN) {
      const pinnedRepos = await fetchPinnedRepos(username, process.env.GITHUB_TOKEN);
      if (pinnedRepos.length > 0) return pinnedRepos;
    }

    // Fallback: top starred public repos
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&direction=desc&per_page=6&type=public`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const repos: GitHubRepo[] = await res.json();
    return repos.filter(r => !r.fork && !r.archived).slice(0, 6);
  } catch (err) {
    console.error('GitHub fetch error:', err);
    return [];
  }
}

async function fetchPinnedRepos(username: string, token: string): Promise<GitHubRepo[]> {
  const query = `
    query {
      user(login: "${username}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              stargazerCount
              forkCount
              primaryLanguage { name }
              repositoryTopics(first: 10) {
                nodes { topic { name } }
              }
              updatedAt
            }
          }
        }
      }
    }
  `;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  const data = await res.json();
  const nodes = data?.data?.user?.pinnedItems?.nodes || [];

  return nodes.map((repo: any) => ({
    id: repo.name,
    name: repo.name,
    full_name: `${username}/${repo.name}`,
    description: repo.description,
    html_url: repo.url,
    homepage: repo.homepageUrl,
    stargazers_count: repo.stargazerCount,
    forks_count: repo.forkCount,
    language: repo.primaryLanguage?.name || null,
    topics: repo.repositoryTopics?.nodes?.map((n: any) => n.topic.name) || [],
    updated_at: repo.updatedAt,
    fork: false,
    archived: false,
  }));
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  if (!username) return null;
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'portfolio-app',
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export function repoToProject(repo: GitHubRepo) {
  return {
    id: `github-${repo.name}`,
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || 'No description provided.',
    longDescription: repo.description || '',
    image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    tags: [repo.language, ...repo.topics.slice(0, 4)].filter(Boolean) as string[],
    github: repo.html_url,
    demo: repo.homepage || '',
    featured: false,
    year: new Date(repo.updated_at).getFullYear(),
    metrics: `⭐ ${repo.stargazers_count} · 🍴 ${repo.forks_count}`,
    fromGitHub: true,
  };
}
