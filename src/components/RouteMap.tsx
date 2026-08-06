"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointOfInterest } from "@/lib/points-of-interest";

const MAPLIBRE_CSS_URL =
  "https://cdn.jsdelivr.net/npm/maplibre-gl@4/dist/maplibre-gl.css";
const MAPLIBRE_JS_URL =
  "https://cdn.jsdelivr.net/npm/maplibre-gl@4/dist/maplibre-gl.js";
const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

interface RouteStop {
  id: number;
  kind: "start" | "stop";
  tag: string;
  name: string;
  coord: [number, number];
  desc: string;
  img?: string;
}

// The meeting point isn't one of the 8 marketing-editable points of
// interest, so it stays fully hardcoded here.
const START_POINT: RouteStop = {
  id: 0,
  kind: "start",
  tag: "Start",
  name: "Drury Street Car Park",
  coord: [-6.2634, 53.3417],
  desc: "This is where the adventure begins: pick up your bike at the Drury Street Multi-Storey Car Park (Bike Park), Dublin 2. Follow the signs inside the car park to find our desk.",
};

// Route coordinates are a mapping concern, not marketing content, so they
// stay keyed by id here rather than living in the points_of_interest table.
const COORD_BY_ID: Record<number, [number, number]> = {
  1: [-6.2675, 53.3429],
  2: [-6.2715, 53.3395],
  3: [-6.279, 53.3417],
  4: [-6.2867, 53.3419],
  5: [-6.2986, 53.3406],
  6: [-6.3073, 53.3421],
  7: [-6.2848, 53.3389],
  8: [-6.2705, 53.3434],
};

function lerp(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function buildPath(routeStops: RouteStop[]): [number, number][] {
  const coords = routeStops.map((p) => p.coord).concat([routeStops[0].coord]);
  const stepsPerSeg = 40;
  const path: [number, number][] = [];
  for (let i = 0; i < coords.length - 1; i++) {
    for (let s = 0; s < stepsPerSeg; s++) {
      path.push(lerp(coords[i], coords[i + 1], s / stepsPerSeg));
    }
  }
  path.push(coords[coords.length - 1]);
  return path;
}

// The library is loaded via CDN (instead of an npm dependency) because
// this widget is self-contained and doesn't need to be part of the app bundle.
let mapLibreLoading: Promise<any> | null = null;

function loadMapLibreGL(): Promise<any> {
  const w = window as unknown as { maplibregl?: any };
  if (w.maplibregl) return Promise.resolve(w.maplibregl);
  if (mapLibreLoading) return mapLibreLoading;

  mapLibreLoading = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${MAPLIBRE_CSS_URL}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = MAPLIBRE_CSS_URL;
      document.head.appendChild(link);
    }

    const existing = document.querySelector(
      `script[src="${MAPLIBRE_JS_URL}"]`
    ) as HTMLScriptElement | null;

    const onReady = () =>
      resolve((window as unknown as { maplibregl: any }).maplibregl);
    const onError = () => reject(new Error("Falha ao carregar o MapLibre GL"));

    if (existing) {
      existing.addEventListener("load", onReady);
      existing.addEventListener("error", onError);
      return;
    }

    const script = document.createElement("script");
    script.src = MAPLIBRE_JS_URL;
    script.async = true;
    script.addEventListener("load", onReady);
    script.addEventListener("error", onError);
    document.body.appendChild(script);
  });

  return mapLibreLoading;
}

export default function RouteMap({ points }: { points: PointOfInterest[] }) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const playRouteRef = useRef<() => void>(() => {});
  const bikeFrameRef = useRef<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const routeStops: RouteStop[] = useMemo(
    () => [
      START_POINT,
      ...points.map((point) => ({
        id: point.id,
        kind: "stop" as const,
        tag: point.tag,
        name: point.title,
        coord: COORD_BY_ID[point.id] ?? START_POINT.coord,
        desc: point.longDesc,
        img: point.imageUrl,
      })),
    ],
    [points],
  );

  const selectedStop =
    selectedId !== null
      ? routeStops.find((s) => s.id === selectedId) ?? null
      : null;

  useEffect(() => {
    if (selectedId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  useEffect(() => {
    let cancelled = false;

    loadMapLibreGL()
      .then((maplibregl) => {
        if (cancelled || !mapContainer.current) return;

        const map = new maplibregl.Map({
          container: mapContainer.current,
          style: MAP_STYLE_URL,
          center: [-6.285, 53.341],
          zoom: 13.5,
          pitch: 55,
          bearing: -20,
          antialias: true,
        });
        mapRef.current = map;

        map.addControl(
          new maplibregl.NavigationControl({ visualizePitch: true }),
          "top-right"
        );
        map.addControl(new maplibregl.FullscreenControl(), "top-right");

        map.on("load", () => {
          if (cancelled) return;

          const fullPath = buildPath(routeStops);

          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: { type: "LineString", coordinates: fullPath },
            },
          });
          map.addLayer({
            id: "route-glow",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
              "line-color": "#f5a623",
              "line-width": 12,
              "line-opacity": 0.35,
              "line-blur": 3,
            },
          });
          map.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
              "line-color": "#e1251b",
              "line-width": 5,
              "line-opacity": 0.9,
            },
          });

          routeStops.forEach((stop) => {
            const el = document.createElement("div");
            el.className =
              "route-marker" + (stop.kind === "start" ? " is-start" : "");
            el.innerHTML = `<span>${
              stop.kind === "start" ? "🚲" : stop.id
            }</span>`;
            el.addEventListener("click", () => setSelectedId(stop.id));

            new maplibregl.Marker({ element: el, anchor: "bottom" })
              .setLngLat(stop.coord)
              .addTo(map);
          });

          const bikeWrap = document.createElement("div");
          bikeWrap.className = "route-bike-wrap";
          bikeWrap.innerHTML = '<span class="route-bike-icon">🚲</span>';
          const bikeMarker = new maplibregl.Marker({
            element: bikeWrap,
            anchor: "center",
          })
            .setLngLat(fullPath[0])
            .addTo(map);

          const LOOP_DURATION = 30000;
          let animStart: number | null = null;

          const animateBike = (timestamp: number) => {
            if (animStart === null) animStart = timestamp;
            const elapsed = (timestamp - animStart) % LOOP_DURATION;
            const progress = elapsed / LOOP_DURATION;
            const floatIndex = progress * (fullPath.length - 1);
            const i0 = Math.floor(floatIndex);
            const i1 = Math.min(i0 + 1, fullPath.length - 1);
            bikeMarker.setLngLat(
              lerp(fullPath[i0], fullPath[i1], floatIndex - i0)
            );
            bikeFrameRef.current = requestAnimationFrame(animateBike);
          };

          playRouteRef.current = () => {
            animStart = null;
          };

          const lons = routeStops.map((p) => p.coord[0]);
          const lats = routeStops.map((p) => p.coord[1]);
          const bounds: [[number, number], [number, number]] = [
            [Math.min(...lons) - 0.004, Math.min(...lats) - 0.003],
            [Math.max(...lons) + 0.004, Math.max(...lats) + 0.003],
          ];
          map.fitBounds(bounds, {
            pitch: 55,
            bearing: -20,
            padding: { top: 70, bottom: 40, left: 40, right: 40 },
            duration: 0,
          });

          bikeFrameRef.current = requestAnimationFrame(animateBike);
          setStatus("ready");
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      if (bikeFrameRef.current !== null) {
        cancelAnimationFrame(bikeFrameRef.current);
        bikeFrameRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [routeStops]);

  return (
    <div className="mx-auto mt-16 max-w-6xl px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-2xl font-bold text-brand-dark sm:text-3xl">
          See the Full Route
        </h3>
        <p className="mt-3 text-gray-600">
          Explore the interactive 3D map of the tour: from the meeting point
          to the 8 historic stops. Tap a marker to see photos and details
          for each location.
        </p>
      </div>

      <div className="relative mx-auto mt-8 overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
        <div
          ref={mapContainer}
          className="h-[420px] w-full sm:h-[480px] lg:h-[560px]"
        />

        {status !== "error" && (
          <button
            type="button"
            onClick={() => playRouteRef.current()}
            className="absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-gold px-5 py-2 text-sm font-bold text-brand-dark shadow-lg transition hover:scale-105 active:scale-95"
          >
            ↻ Restart animation
          </button>
        )}

        {status === "loading" && (
          <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-100">
            <span className="text-sm font-semibold text-gray-500">
              Loading map…
            </span>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 px-6 text-center">
            <span className="text-sm font-semibold text-gray-500">
              We couldn&apos;t load the interactive map. Please try again
              later.
            </span>
          </div>
        )}
      </div>

      {selectedStop && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setSelectedId(null)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-xl text-white transition hover:bg-black/60 active:scale-90"
            >
              ×
            </button>
            {selectedStop.img ? (
              <div
                className="h-56 w-full bg-cover bg-center sm:h-64"
                style={{ backgroundImage: `url(${selectedStop.img})` }}
              />
            ) : (
              <div className="flex h-56 items-center justify-center bg-brand-dark text-6xl sm:h-64">
                🚲
              </div>
            )}
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-wide text-brand-red">
                {selectedStop.tag}
              </span>
              <h3 className="mt-1 text-xl font-bold text-brand-dark">
                {selectedStop.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {selectedStop.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .route-marker {
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          background: #e1251b;
          border: 3px solid #fff;
          transform: rotate(-45deg);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .route-marker span {
          transform: rotate(45deg);
          color: #fff;
          font-weight: bold;
          font-size: 13px;
        }
        .route-marker.is-start {
          background: #1a1a1a;
        }
        .route-bike-wrap {
          pointer-events: none;
          z-index: 5;
        }
        .route-bike-icon {
          display: block;
          font-size: 26px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
          animation: route-bike-bob 1.2s ease-in-out infinite;
        }
        @keyframes route-bike-bob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  );
}
