import { lang } from "next/root-params";
import { hasLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteHeader } from "@/components/SiteHeader";
import { ClosingFooter } from "@/components/ClosingFooter";

export default async function NotFound() {
  const value = await lang();
  const locale = hasLocale(value) ? value : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <title>{`${dict.meta.notFoundTitle} — Lucas Cipriano`}</title>
      <meta name="robots" content="noindex" />
      <SiteHeader locale={locale} dict={dict} />
      <main id="main" tabIndex={-1} className="container-page flex min-h-[60vh] flex-col justify-center gap-6 py-section focus:outline-none">
        <p className="text-subhero text-text-secondary">404</p>
        <h1 className="text-hero font-medium tracking-tight">{dict.notFound.title}</h1>
        <p className="max-w-[32rem] text-lead text-text-secondary">{dict.notFound.body}</p>
        <a
          href={`/${locale}`}
          className="inline-flex min-h-11 w-fit items-center rounded-full bg-text-primary px-6 text-body font-medium text-text-inverse hover:bg-[#333]"
        >
          {dict.notFound.cta}
        </a>
      </main>
      <ClosingFooter locale={locale} dict={dict} />
    </>
  );
}
