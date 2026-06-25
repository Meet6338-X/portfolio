import { portfolioConfig } from '@/config/portfolio.config';
import { getAbsoluteUrl, getSiteUrl } from '@/lib/site';

export function buildStructuredData() {
  const siteUrl = getSiteUrl();
  const imageUrl = getAbsoluteUrl(portfolioConfig.avatarURL);
  const sameAs = [
    portfolioConfig.social.linkedin,
    portfolioConfig.social.github,
    portfolioConfig.social.twitter,
    portfolioConfig.social.website,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: portfolioConfig.name,
        alternateName: [portfolioConfig.fullName, portfolioConfig.nickname, portfolioConfig.githubUsername],
        url: siteUrl,
        image: imageUrl,
        jobTitle: portfolioConfig.title,
        description: portfolioConfig.seo.description,
        email: `mailto:${portfolioConfig.email}`,
        telephone: portfolioConfig.phone,
        award: portfolioConfig.achievements,
        hasCredential: portfolioConfig.certifications.map((cert) => ({
          '@type': 'EducationalOccupationalCredential',
          name: cert.name,
          credentialCategory: 'certificate',
          recognizedBy: {
            '@type': 'Organization',
            name: cert.issuer,
          },
          dateCreated: String(cert.year),
          url: cert.url || undefined,
        })),
        hasOccupation: {
          '@type': 'Occupation',
          name: 'AI Developer and Software Engineer',
          occupationLocation: {
            '@type': 'City',
            name: 'Pune',
          },
          skills: portfolioConfig.seo.keywords,
        },
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
          'RAG',
          'Agentic AI',
          'Flutter',
          'Dart',
          'React',
          'Next.js',
          'REST API Development',
          'Backend Engineering',
          'Python',
          'Data Science',
          'Machine Learning',
          'Software Engineering in Pune India',
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
