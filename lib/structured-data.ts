import { portfolioConfig } from '@/config/portfolio.config';
import { getAbsoluteUrl, getSiteUrl } from '@/lib/site';

export function buildStructuredData() {
  const siteUrl = getSiteUrl();
  const imageUrl = getAbsoluteUrl(portfolioConfig.avatarURL);
  const sameAs = [
    portfolioConfig.social.linkedin,
    portfolioConfig.social.github,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: portfolioConfig.name,
        alternateName: [portfolioConfig.nickname, portfolioConfig.githubUsername],
        url: siteUrl,
        image: imageUrl,
        jobTitle: portfolioConfig.title,
        description: portfolioConfig.seo.description,
        email: `mailto:${portfolioConfig.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Pune',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
        alumniOf: [
          {
            '@type': 'CollegeOrUniversity',
            name: 'Vishwakarma Institute of Technology, Pune',
            sameAs: 'https://www.vit.edu/',
          },
          {
            '@type': 'EducationalOrganization',
            name: 'AISSMS Polytechnic, Pune',
          },
        ],
        knowsAbout: [
          'Artificial Intelligence',
          'Large Language Models',
          'Generative AI',
          'Prompt Engineering',
          'Flutter',
          'Dart',
          'React',
          'Next.js',
          'Python',
          'Machine Learning',
        ],
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: `${portfolioConfig.name} Portfolio`,
        url: siteUrl,
        publisher: {
          '@id': `${siteUrl}/#person`,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profile-page`,
        url: siteUrl,
        name: portfolioConfig.seo.title,
        description: portfolioConfig.seo.description,
        image: imageUrl,
        mainEntity: {
          '@id': `${siteUrl}/#person`,
        },
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
      },
    ],
  };
}
