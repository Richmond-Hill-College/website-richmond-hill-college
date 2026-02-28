import { ImageResponse } from "next/og";

/**
 * Dynamic favicon for Richmond Hill College.
 * Renders a clean "RHC" monogram on brand slate background.
 * Next.js serves this as /icon and as favicon.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: 6,
          fontFamily: "system-ui, sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: "#f8fafc",
          letterSpacing: "-0.02em",
        }}
      >
        RHC
      </div>
    ),
    { ...size }
  );
}
