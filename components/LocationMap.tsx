"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

/** Richmond Hill College: 1 Sala Drive, Richmond Hill, Ontario, Canada */
const CENTER: [number, number] = [43.8785, -79.435];
const ZOOM = 14;
const ADDRESS = "1 Sala Drive, Richmond Hill, ON";
const ADDRESS_FULL = "1 Sala Drive, Richmond Hill, ON, Canada";

const GOOGLE_MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_FULL)}`;
const APPLE_MAPS_DIRECTIONS = `https://maps.apple.com/?daddr=${encodeURIComponent(ADDRESS_FULL)}`;
const WAZE_DIRECTIONS = `https://waze.com/ul?ll=${CENTER[0]},${CENTER[1]}&navigate=yes`;

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

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 20,
        subdomains: "abcd",
      }).addTo(map);

      const logoUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/images/logo/rhc-logo.png`
          : "/images/logo/rhc-logo.png";

      const pinWidth = 40;
      const pinHeight = 50;
      const logoSize = 28;
      const tailSize = 10;

      const markerHtml = `
        <div style="
          display:flex;
          flex-direction:column;
          align-items:center;
          width:${pinWidth}px;
          height:${pinHeight}px;
          box-sizing:border-box;
        ">
          <div style="
            width:${pinWidth}px;
            height:${pinWidth}px;
            min-width:${pinWidth}px;
            min-height:${pinWidth}px;
            background:#f6520a;
            border:2px solid rgba(255,255,255,0.9);
            border-radius:50%;
            box-shadow:0 2px 8px rgba(246,82,10,0.4);
            display:flex;
            align-items:center;
            justify-content:center;
            overflow:hidden;
            flex-shrink:0;
            box-sizing:border-box;
          ">
            <img src="${logoUrl}" alt="" width="${logoSize}" height="${logoSize}" style="object-fit:contain;display:block;max-width:${logoSize}px;max-height:${logoSize}px;filter:brightness(0) invert(1)" />
          </div>
          <div style="
            width:0;
            height:0;
            margin-top:-2px;
            border-left:${tailSize}px solid transparent;
            border-right:${tailSize}px solid transparent;
            border-top:${tailSize}px solid #f6520a;
            filter:drop-shadow(0 1px 2px rgba(0,0,0,0.15));
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

      const popupContent = `
        <div class="rhc-map-popup">
          <p class="rhc-map-popup-address"><strong>Richmond Hill College</strong><br>${ADDRESS}</p>
          <p class="rhc-map-popup-label">Get directions</p>
          <div class="rhc-map-popup-links">
            <a href="${GOOGLE_MAPS_DIRECTIONS}" target="_blank" rel="noopener noreferrer" class="rhc-map-popup-link">Google Maps</a>
            <a href="${APPLE_MAPS_DIRECTIONS}" target="_blank" rel="noopener noreferrer" class="rhc-map-popup-link">Apple Maps</a>
            <a href="${WAZE_DIRECTIONS}" target="_blank" rel="noopener noreferrer" class="rhc-map-popup-link">Waze</a>
          </div>
        </div>
      `;

      L.marker(CENTER, { icon: pinIcon })
        .addTo(map)
        .bindPopup(popupContent, { maxWidth: 260, className: "rhc-map-popup-wrapper" })
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
