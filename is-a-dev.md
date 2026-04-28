# meet.is-a.dev Execution Plan

**Goal:** claim `meet.is-a.dev` through the official `is-a-dev/register` workflow, point it at the Vercel portfolio, then verify the production domain before sending IndexNow.

**Status on 2026-04-29:** `https://meet.is-a.dev` is still resolving to the default `is-a.dev` landing/redirect, so the registration or DNS handoff is not complete yet.

## Source of truth

- `is-a.dev` quickstart: [docs.is-a.dev/quickstart](https://docs.is-a.dev/quickstart/)
- `is-a.dev` Vercel guide: [docs.is-a.dev/guides/vercel](https://docs.is-a.dev/guides/vercel/)
- Domain JSON rules: [docs.is-a.dev/domain-structure](https://docs.is-a.dev/domain-structure/)

## Outcome we want

- `meet.is-a.dev` opens the portfolio directly.
- Vercel recognizes `meet.is-a.dev` as the production domain.
- The site serves the updated metadata, sitemap, robots file, OG image, and IndexNow key file from the same host.

## Step-by-step

### 1. Prepare the Vercel domain setup

- Open the Vercel project for this portfolio.
- Go to `Project Settings -> Domains`.
- Add `meet.is-a.dev`.
- If Vercel offers a redirect from `meet.is-a.dev` to `www.meet.is-a.dev`, disable it.
- Continue with manual setup.
- Copy the DNS values Vercel gives you:
  - the main domain record value
  - the TXT verification value for Vercel

### 2. Fork the `is-a-dev/register` repository

- Fork: [github.com/is-a-dev/register](https://github.com/is-a-dev/register)
- Clone your fork locally.
- Create a working branch, for example:

```bash
git clone https://github.com/<your-github-username>/register.git
cd register
git checkout -b add-meet-is-a-dev
```

### 3. Add the required domain files

For Vercel, the docs currently expect two files in the repo's `domains/` directory.

Create `domains/meet.json`:

```json
{
  "owner": {
    "username": "Meet6338-X",
    "email": "shahmeet644@gmail.com"
  },
  "records": {
    "A": ["REPLACE_WITH_THE_A_RECORD_FROM_VERCEL"]
  }
}
```

Create `domains/_vercel.meet.json`:

```json
{
  "owner": {
    "username": "Meet6338-X",
    "email": "shahmeet644@gmail.com"
  },
  "records": {
    "TXT": "REPLACE_WITH_THE_VERCEL_TXT_VERIFICATION_VALUE"
  }
}
```

Notes:

- Keep both filenames lowercase.
- Do not guess the record values; use the exact values shown by Vercel.
- If Vercel shows a different record type or multiple verification strings, mirror what Vercel provides.

### 4. Commit and push the branch

```bash
git add domains/meet.json domains/_vercel.meet.json
git commit -m "Add meet.is-a.dev for Vercel"
git push origin add-meet-is-a-dev
```

### 5. Open the pull request

- Open a PR from your fork to `is-a-dev/register`.
- Use a clear title like:
  - `Add meet.is-a.dev for Vercel`
- Fill out the PR template completely.
- Include a preview URL of the live portfolio in the PR body.

Recommended preview links:

- `https://meet644.vercel.app`
- your current Vercel preview/production deployment URL if it differs

Why this matters:

- Their reviewers often mark PRs as incomplete if the template is missing details.
- They also ask for a working site preview.

### 6. Watch the PR and respond fast

- Keep an eye on PR comments and labels.
- If maintainers request fixes, push updates to the same branch.
- If you use the `is-a.dev` Discord, you can post the PR link once in the pull-request channel to improve visibility.

### 7. Wait for merge and DNS propagation

After merge:

- wait a few minutes, then test `https://meet.is-a.dev`
- if it still shows the old `is-a.dev` page, clear cache and test again
- if it still has not updated after a reasonable delay, re-check the Vercel domain status and the merged JSON records

### 8. Verify Vercel finishes domain validation

In Vercel, confirm `meet.is-a.dev` shows as valid/assigned.

Then verify:

- `https://meet.is-a.dev/`
- `https://meet.is-a.dev/robots.txt`
- `https://meet.is-a.dev/sitemap.xml`
- `https://meet.is-a.dev/meet-shah-profile.png`
- `https://meet.is-a.dev/d72f9a58-f139-450e-b758-16ba711efc62.txt`

### 9. Verify SEO metadata on the final domain

Confirm the homepage source exposes:

- canonical URL: `https://meet.is-a.dev`
- Open Graph title
- Open Graph description
- Open Graph URL
- Open Graph image pointing to the profile image on the same host
- Twitter large-image metadata

### 10. Send the IndexNow ping

Only after the domain works correctly on production:

```bash
npm run indexnow:submit
```

Optional explicit submission:

```bash
npm run indexnow:submit -- https://meet.is-a.dev
```

Expected result:

- HTTP `200` or `202` from IndexNow

## Fast checklist

- [ ] Add `meet.is-a.dev` in Vercel and copy the DNS values
- [ ] Fork `is-a-dev/register`
- [ ] Create `domains/meet.json`
- [ ] Create `domains/_vercel.meet.json`
- [ ] Commit and push branch
- [ ] Open PR with full template and working preview link
- [ ] Wait for merge
- [ ] Confirm `meet.is-a.dev` resolves to the portfolio
- [ ] Re-check metadata and key files on production
- [ ] Run `npm run indexnow:submit`

## Common failure points

- Using guessed DNS values instead of the exact Vercel values
- Forgetting the `_vercel.meet.json` TXT verification file
- Letting Vercel force a `www` redirect
- Opening the PR without a working preview link
- Checking the domain too early and assuming the setup failed
