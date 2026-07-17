import Image from "next/image";
import {
  GENERATED_VISUALS,
  type GeneratedVisualKey,
} from "@/lib/generated-visuals";

export type GeneratedVisualProps = {
  visualKey: GeneratedVisualKey;
  locale?: "en" | "fr";
  /** Applied to the visual wrapper so callers can control its rendered size. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Use an empty string when the visual is decorative. */
  altOverride?: string;
};

/**
 * Renders a generated RHC visual with its catalogued bilingual alternative text.
 * Square icons keep intrinsic dimensions; wide illustrations use a stable 16:9
 * wrapper so they can crop responsively without layout shift.
 */
export function GeneratedVisual({
  visualKey,
  locale = "en",
  className = "",
  sizes,
  priority = false,
  altOverride,
}: GeneratedVisualProps) {
  const visual = GENERATED_VISUALS[visualKey];
  const alt = altOverride ?? visual.alt[locale];

  if (visual.kind === "icon") {
    return (
      <span className={`inline-block max-w-full ${className}`.trim()}>
        <Image
          src={visual.src}
          alt={alt}
          width={160}
          height={160}
          sizes={sizes ?? "160px"}
          priority={priority}
          className="h-auto w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={`relative block aspect-video max-w-full overflow-hidden ${className}`.trim()}
    >
      <Image
        src={visual.src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 1024px) 100vw, 50vw"}
        priority={priority}
        className="object-cover"
      />
    </span>
  );
}
