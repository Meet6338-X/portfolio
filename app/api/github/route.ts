import { NextRequest, NextResponse } from 'next/server';
import { fetchGitHubRepos, fetchGitHubUser, repoToProject } from '@/lib/github';
import { portfolioConfig } from '@/config/portfolio.config';

export const revalidate = 3600; // revalidate every hour

export async function GET(req: NextRequest) {
  const { githubUsername } = portfolioConfig;

  if (!githubUsername) {
    return NextResponse.json({ repos: [], user: null });
  }

  try {
    const [repos, user] = await Promise.all([
      fetchGitHubRepos(githubUsername),
      fetchGitHubUser(githubUsername),
    ]);

    const projects = repos.map(repoToProject);

    return NextResponse.json(
      { repos: projects, user },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (err) {
    console.error('GitHub API error:', err);
    return NextResponse.json({ repos: [], user: null });
  }
}
