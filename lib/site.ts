const DEFAULT_SITE_URL = 'https://meet.is-a.dev';

export const INDEXNOW_KEY = 'd72f9a58-f139-450e-b758-16ba711efc62';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  return configuredUrl.endsWith('/') ? configuredUrl.slice(0, -1) : configuredUrl;
}

export function getAbsoluteUrl(path = '/'): string {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function getSiteHost(): string {
  return new URL(getSiteUrl()).host;
}

export function getIndexNowKeyLocation(): string {
  return getAbsoluteUrl(`/${INDEXNOW_KEY}.txt`);
}
