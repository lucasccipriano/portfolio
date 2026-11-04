import type { Locale } from "@/i18n/config";
import type { CaseImage } from "@/content/cases/types";
import { resolveLocalizedImage } from "@/lib/case-images";
import { ZoomableImage } from "./ZoomableImage";

type Props = {
  folder: string;
  image: CaseImage;
  locale: Locale;
  labels: { enlarge: string; close: string };
  sizes?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Imagem do case. Se o arquivo ainda não estiver em /public, mostra um espaço reservado
 * com o nome esperado (para saber o que exportar do Figma).
 */
export function CaseFigure({
  folder,
  image,
  locale,
  labels,
  sizes = "(min-width: 1440px) 1312px, 100vw",
  className = "",
  priority,
}: Props) {
  const ratio = image.ratio ?? 16 / 9;
  const src = resolveLocalizedImage(folder, image.file, locale);

  if (!src) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`flex items-center justify-center border border-dashed border-border bg-surface-placeholder p-4 text-center text-caption text-text-secondary ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <span aria-hidden="true">
          {folder.replace(/^\//, "public/")}/{image.file}.png
        </span>
      </div>
    );
  }

  return (
    <ZoomableImage
      src={src}
      alt={image.alt}
      ratio={ratio}
      sizes={sizes}
      locale={locale}
      enlargeLabel={labels.enlarge}
      closeLabel={labels.close}
      className={className}
      priority={priority}
    />
  );
}
