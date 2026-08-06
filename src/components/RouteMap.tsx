"use client";

import { useEffect, useRef, useState } from "react";

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

const routeStops: RouteStop[] = [
  {
    id: 0,
    kind: "start",
    tag: "Start",
    name: "Drury Street Car Park",
    coord: [-6.2634, 53.3417],
    desc: "This is where the adventure begins: pick up your bike at the Drury Street Multi-Storey Car Park (Bike Park), Dublin 2. Follow the signs inside the car park to find our desk.",
  },
  {
    id: 1,
    kind: "stop",
    tag: "Stop 1",
    name: "Dublin Castle",
    coord: [-6.2675, 53.3429],
    desc: "A 13th-century fortress at the heart of Irish governance, with lavish State Apartments featuring Waterford crystal chandeliers, a medieval Undercroft and the Gothic Revival Chapel Royal. Its gardens offer a peaceful break from the busy city streets.",
    img: "/stops/dublin-castle.jpg",
  },
  {
    id: 2,
    kind: "stop",
    tag: "Stop 2",
    name: "St Patrick's Cathedral",
    coord: [-6.2715, 53.3395],
    desc: "Ireland's largest cathedral, built in 1191 and dedicated to the country's patron saint. Home to the tomb of Jonathan Swift, author of 'Gulliver's Travels', with striking Gothic architecture and stained glass, and a history that includes sheltering locals during the 1641 Irish Rebellion.",
    img: "/stops/st-patricks-cathedral.jpg",
  },
  {
    id: 3,
    kind: "stop",
    tag: "Stop 3",
    name: "The Liberties",
    coord: [-6.279, 53.3417],
    desc: "One of Dublin's oldest neighbourhoods, dating back to the 12th century and once located outside the city walls. Today it mixes traditional markets, craft distilleries and hidden gems like Marsh's Library, Ireland's oldest public library.",
    img: "/stops/the-liberties.jpg",
  },
  {
    id: 4,
    kind: "stop",
    tag: "Stop 4",
    name: "Guinness Storehouse",
    coord: [-6.2867, 53.3419],
    desc: "Dublin's most visited attraction, housed in a seven-storey building shaped like a giant pint glass. Learn about the 250-year history of Ireland's most famous export, explore vintage advertising, and take in panoramic views of the city from the Gravity Bar.",
    img: "/stops/guinness-storehouse.jpg",
  },
  {
    id: 5,
    kind: "stop",
    tag: "Stop 5",
    name: "IMMA / Royal Hospital",
    coord: [-6.2986, 53.3406],
    desc: "A magnificent 17th-century building inspired by Les Invalides in Paris, now home to the Irish Museum of Modern Art. Formal gardens and a collection of over 3,500 artworks, with the Great Hall and Chapel among its architectural highlights.",
    img: "/stops/imma-royal-hospital.jpg",
  },
  {
    id: 6,
    kind: "stop",
    tag: "Stop 6",
    name: "Kilmainham Gaol",
    coord: [-6.3073, 53.3421],
    desc: "A former prison, built in 1796, that held many leaders of Ireland's fight for independence, including participants of the 1916 Easter Rising. Its austere cells and restoration exhibition offer a powerful look at Ireland's history.",
    img: "/stops/kilmainham-gaol.jpg",
  },
  {
    id: 7,
    kind: "stop",
    tag: "Stop 7",
    name: "St Patrick's Tower",
    coord: [-6.2848, 53.3389],
    desc: "A unique octagonal smock windmill dating back to 1757, once part of the Roe Distillery. Europe's tallest windmill and no longer operational, its green copper dome remains an iconic landmark in the Liberties.",
    img: "/stops/st-patricks-tower.jpg",
  },
  {
    id: 8,
    kind: "stop",
    tag: "Stop 8",
    name: "Christ Church Cathedral",
    coord: [-6.2705, 53.3434],
    desc: "Founded in 1028 and standing at the heart of medieval Dublin, with one of the largest crypts in Britain and Ireland. Climb the belfry to ring the bells, and look out for the mummified cat and rat immortalised in James Joyce's 'Finnegans Wake'.",
    img: "/stops/christ-church.jpg",
  },
];

function lerp(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function buildPath(): [number, number][] {
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

export default function RouteMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const playRouteRef = useRef<() => void>(() => {});
  const bikeFrameRef = useRef<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);
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

          const fullPath = buildPath();

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
  }, []);

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
