import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { preload } from "react-dom";
import "../globals.css";
import { hasLocale, htmlLang, activeLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile, siteUrl } from "@/content/profile";
import { baseOpenGraph } from "@/lib/metadata";
import { Reveal } from "@/components/Reveal";
import { ScrollReset } from "@/components/ScrollReset";

export async function generateStaticParams() {
  return activeLocales.map((l) => ({ lang: l }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.homeTitle, template: `%s — ${profile.name}` },
    description: profile.description[locale],
    applicationName: profile.name,
    authors: [{ name: profile.name, url: `${siteUrl}/${locale}` }],
    creator: profile.name,
    openGraph: { ...baseOpenGraph(locale), type: "website" },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  // Só a fonte usada acima da dobra é pré-carregada.
  preload("/fonts/Satoshi-Variable.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    <html lang={htmlLang[locale]} suppressHydrationWarning>
      <head>
        {/* Hotjar Tracking Code for Portfólio - Lucas Cipriano */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6844297,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-text-primary px-5 py-3 text-body font-medium text-text-inverse focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {dict.a11y.skipToContent}
        </a>
        {children}
        <Reveal />
        <ScrollReset />
        {/* Vercel Web Analytics: só envia dados no site publicado na Vercel (no localhost não faz nada). */}
        <Analytics />
      </body>
    </html>
  );
}
