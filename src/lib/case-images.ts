import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/i18n/config";

const EXTENSIONS = [".webp", ".avif", ".png", ".jpg", ".jpeg"];

/**
 * Procura o arquivo de uma imagem do case em /public, aceitando qualquer extensão comum.
 * Retorna o caminho público (ex.: "/images/work/x/hero.png") ou null se ainda não existir.
 * Roda no servidor (no build), então não pesa no navegador.
 */
export function resolvePublicImage(folder: string, file: string): string | null {
  for (const ext of EXTENSIONS) {
    const publicPath = `${folder}/${file}${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", publicPath))) return publicPath;
  }
  return null;
}

/**
 * Versão da imagem no idioma da página: em inglês, usa "<nome>-en" se existir (ex.: flow-home-en.png);
 * senão (ou em português), a imagem original.
 */
export function resolveLocalizedImage(folder: string, file: string, locale: Locale): string | null {
  if (locale !== "pt-br") {
    const localized = resolvePublicImage(folder, `${file}-${locale}`);
    if (localized) return localized;
  }
  return resolvePublicImage(folder, file);
}
