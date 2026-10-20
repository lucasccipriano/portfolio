import { htmlLang, type Locale } from "@/i18n/config";
import { personId, profile, sameAs, siteUrl, websiteId } from "@/content/profile";
import type { Project } from "@/content/projects";

/** Todos os schemas saem de `profile.ts` e `projects.ts`, para nunca divergirem entre páginas. */

export function personSchema(locale: Locale) {
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    jobTitle: profile.jobTitle[locale],
    description: profile.description[locale],
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}${profile.image}`,
    nationality: { "@type": "Country", name: "Brazil" },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.location.city,
        addressCountry: profile.location.countryCode,
      },
    },
    knowsAbout: profile.knowsAbout,
    knowsLanguage: profile.languages,
    worksFor: { "@type": "Organization", name: profile.currentCompany.name, url: profile.currentCompany.url },
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: profile.name,
    inLanguage: [htmlLang["pt-br"], htmlLang.en],
    publisher: { "@id": personId },
    about: { "@id": personId },
    description: profile.description[locale],
  };
}

export function homeGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(locale),
      websiteSchema(locale),
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/${locale}#profilepage`,
        url: `${siteUrl}/${locale}`,
        inLanguage: htmlLang[locale],
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        dateModified: "2026-10-20",
      },
    ],
  };
}

export function projectGraph(project: Project, locale: Locale) {
  const url = `${siteUrl}/${locale}/work/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        url,
        name: project.title[locale],
        headline: project.title[locale],
        abstract: project.summary[locale],
        inLanguage: htmlLang[locale],
        author: { "@id": personId },
        creator: { "@id": personId },
        about: project.category[locale],
        keywords: project.keywords.join(", "),
        image: `${siteUrl}${project.cover.src}`,
        datePublished: project.datePublished,
        dateModified: project.dateModified,
        temporalCoverage: `${project.period.start}/${project.period.end}`,
        sourceOrganization: { "@type": "Organization", name: project.company },
        isPartOf: { "@id": websiteId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: profile.name, item: `${siteUrl}/${locale}` },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "pt-br" ? "Trabalhos" : "Work",
            item: `${siteUrl}/${locale}#work`,
          },
          { "@type": "ListItem", position: 3, name: project.title[locale], item: url },
        ],
      },
      personSchema(locale),
    ],
  };
}
