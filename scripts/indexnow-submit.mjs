import { readFile } from 'node:fs/promises';

const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || 'https://meet.is-a.dev'
);
const indexNowKey = 'd72f9a58-f139-450e-b758-16ba711efc62';
const indexNowEndpoint = 'https://api.indexnow.org/indexnow';
const keyLocation = new URL(`/${indexNowKey}.txt`, `${siteUrl}/`).toString();

async function main() {
  const urls = process.argv.slice(2);
  const urlList = urls.length > 0 ? urls : [siteUrl];

  for (const url of urlList) {
    assertSameHost(url);
  }

  await verifyKeyFile();

  const response = await fetch(indexNowEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      host: new URL(siteUrl).host,
      key: indexNowKey,
      keyLocation,
      urlList,
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`IndexNow submission failed (${response.status}): ${responseText}`);
  }

  console.log(`IndexNow accepted ${urlList.length} URL(s) for ${siteUrl}.`);
  if (responseText) {
    console.log(responseText);
  }
}

function normalizeSiteUrl(url) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

function assertSameHost(url) {
  const parsedUrl = new URL(url);
  const parsedSiteUrl = new URL(siteUrl);

  if (parsedUrl.host !== parsedSiteUrl.host) {
    throw new Error(`URL host mismatch: ${url} does not belong to ${parsedSiteUrl.host}`);
  }
}

async function verifyKeyFile() {
  const keyContents = (await readFile(new URL(`../public/${indexNowKey}.txt`, import.meta.url), 'utf8')).trim();

  if (keyContents !== indexNowKey) {
    throw new Error('IndexNow key file contents do not match the configured key.');
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
