import { ImageResponse } from "next/og";

/**
 * Default Open Graph image (1200×630) for link previews and URL thumbnails.
 * Used when a page does not define its own opengraph-image.
 */
export const alt = "Richmond Hill College | Healthcare and Technology Management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#f8fafc",
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          Richmond Hill College
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            fontWeight: 500,
            maxWidth: 720,
            textAlign: "center",
          }}
        >
          Healthcare and Technology Management
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#64748b",
            marginTop: 24,
          }}
        >
          Unlocking potential, building futures.
        </div>
      </div>
    ),
    { ...size }
  );
}
