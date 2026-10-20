import { ImageResponse } from "next/og";
import { hasLocale, locales } from "@/i18n/config";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Lucas Cipriano — Product Designer";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Imagem de compartilhamento (1200×630) gerada a partir dos dados do perfil. */
export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const tagline =
    locale === "pt-br"
      ? "Product Designer com experiência em produtos usados por milhões."
      : "Product Designer with experience designing products used by millions.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0b",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{profile.name}</div>
          <div style={{ fontSize: 28, color: "#aaaaaa" }}>{profile.jobTitle[locale]}</div>
        </div>
        <div style={{ fontSize: 64, lineHeight: 1.15, letterSpacing: -2, maxWidth: 1000 }}>{tagline}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#aaaaaa" }}>
          <span>{profile.location.cityLocalized[locale]}, PT</span>
          <span style={{ color: "#e06a1f" }}>
            {locale === "pt-br" ? "Atualmente na" : "Currently at"} {profile.currentCompany.name}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
