"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

/** Richmond Hill College: 1 Sala Drive, Richmond Hill, Ontario, Canada */
const CENTER: [number, number] = [43.8785, -79.435];
const ZOOM = 16;

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

      const pinWidth = 52;
      const pinHeight = 64;
      const logoMaxWidth = 30;
      const logoMaxHeight = 22;

      const markerHtml = `
        <div style="
          display:flex;
          flex-direction:column;
          align-items:center;
          width:${pinWidth}px;
          height:${pinHeight}px;
        ">
          <div style="
            width:${pinWidth}px;
            height:${pinWidth}px;
            background:#fff;
            border:2px solid #e2e8f0;
            border-radius:50%;
            box-shadow:0 2px 8px rgba(0,0,0,0.15);
            display:flex;
            align-items:center;
            justify-content:center;
            overflow:hidden;
            flex-shrink:0;
          ">
            <img
              src="${logoUrl}"
              alt=""
              style="
                width:auto;
                height:auto;
                max-width:${logoMaxWidth}px;
                max-height:${logoMaxHeight}px;
                object-fit:contain;
                object-position:center;
                display:block;
              "
            />
          </div>
          <div style="
            width:0;
            height:0;
            margin-top:-2px;
            border-left:14px solid transparent;
            border-right:14px solid transparent;
            border-top:14px solid #fff;
            filter:drop-shadow(0 1px 2px rgba(0,0,0,0.1));
          "></div>
        </div>
      `;

      const pinIcon = L.divIcon({
        html: markerHtml,
        className: "rhc-location-marker",
        iconSize: [pinWidth, pinHeight],
        iconAnchor: [pinWidth / 2, pinHeight],
        popupAnchor: [0, -pinHeight],
      });

      L.marker(CENTER, { icon: pinIcon })
        .addTo(map)
        .bindPopup("Richmond Hill College<br>1 Sala Drive, Richmond Hill, ON")
        .openPopup();

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
