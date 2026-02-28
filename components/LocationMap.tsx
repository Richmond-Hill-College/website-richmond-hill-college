"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

/** Richmond Hill College: 1 Sala Drive, Richmond Hill, Ontario, Canada */
const CENTER: [number, number] = [43.8785, -79.435];
const ZOOM = 16;
const LOGO_MARKER_SIZE = 48;

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const init = async () => {
      const L = (await import("leaflet")).default;

      if (!containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      const logoUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/images/logo/rhc-logo.png`
          : "/images/logo/rhc-logo.png";

      const logoIcon = L.icon({
        iconUrl: logoUrl,
        iconSize: [LOGO_MARKER_SIZE, LOGO_MARKER_SIZE],
        iconAnchor: [LOGO_MARKER_SIZE / 2, LOGO_MARKER_SIZE],
        popupAnchor: [0, -LOGO_MARKER_SIZE],
        shadowUrl: "",
        shadowSize: [0, 0],
      });

      L.marker(CENTER, { icon: logoIcon })
        .addTo(map)
        .bindPopup("Richmond Hill College<br>1 Sala Drive, Richmond Hill, ON");

      map.setView(CENTER, ZOOM);
      mapRef.current = map;
    };

    init();
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[240px] w-full overflow-hidden rounded-lg border border-slate-200 tablet:h-[280px]"
      aria-label="Map showing Richmond Hill College location"
    />
  );
}
