import type { Locale } from "@/i18n/config";
import type { CaseContent } from "./types";
import { caseFolder as nosFolder, nosTvOnboarding } from "./nos-tv-onboarding";

/** Cases com página completa, por slug do projeto (ver `projects.ts`). */
const cases: Record<string, { folder: string; content: Record<Locale, CaseContent> }> = {
  "nos-tv-onboarding": { folder: nosFolder, content: nosTvOnboarding },
};

export const getCase = (slug: string) => cases[slug];
