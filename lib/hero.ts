import { GENERATED_VISUALS } from "@/lib/generated-visuals";

/**
 * First hero slide asset used on the landing page.
 * Used for the hero carousel and for the index/OG thumbnail so they stay in sync.
 */
export const FIRST_HERO_IMAGE = {
  src: GENERATED_VISUALS.globalBridgeHero.src,
  alt: GENERATED_VISUALS.globalBridgeHero.alt.en,
  altFr: GENERATED_VISUALS.globalBridgeHero.alt.fr,
} as const;
