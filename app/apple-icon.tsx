import { ImageResponse } from "next/og";

/**
 * Apple touch icon (e.g. Add to Home Screen).
 * Same brand treatment as favicon at 180x180.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 28,
          fontFamily: "system-ui, sans-serif",
          fontSize: 72,
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
