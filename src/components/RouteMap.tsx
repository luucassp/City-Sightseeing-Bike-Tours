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
    desc: "For almost 800 years, this was the centre of British power in Ireland. The medieval fortress was transformed over the centuries into a Georgian palace, and the grounds today still include the castle gardens and attractions like the Chester Beatty museum.",
    img: "/stops/dublin-castle.jpg",
  },
  {
    id: 2,
    kind: "stop",
    tag: "Stop 2",
    name: "St Patrick's Cathedral",
    coord: [-6.2715, 53.3395],
    desc: "Ireland's largest cathedral was built on the site where, according to tradition, St Patrick baptised the first converts. It stands out for its Gothic architecture and as the burial place of Jonathan Swift, author of Gulliver's Travels.",
    img: "/stops/st-patricks-cathedral.jpg",
  },
  {
    id: 3,
    kind: "stop",
    tag: "Stop 3",
    name: "The Liberties",
    coord: [-6.279, 53.3417],
    desc: "One of Dublin's oldest neighbourhoods, dating back to the 12th century, when it lay outside the city walls. It was once an industrial hub of distilleries and breweries, and today blends history with modern urban life — look out for the colourful doors of the 19th-century workers' cottages.",
    img: "/stops/the-liberties.jpg",
  },
  {
    id: 4,
    kind: "stop",
    tag: "Stop 4",
    name: "Guinness Storehouse",
    coord: [-6.2867, 53.3419],
    desc: "Housed in a seven-storey building shaped like a giant pint glass, it tells the 250-year story of Ireland's most famous brand and how Guinness became a commercial success with huge influence on the city.",
    img: "/stops/guinness-storehouse.jpg",
  },
  {
    id: 5,
    kind: "stop",
    tag: "Stop 5",
    name: "IMMA / Royal Hospital",
    coord: [-6.2986, 53.3406],
    desc: "A 17th-century building inspired by Les Invalides in Paris, now home to the Irish Museum of Modern Art. A curious transition: from military hospital to contemporary art gallery.",
    img: "/stops/imma-royal-hospital.jpg",
  },
  {
    id: 6,
    kind: "stop",
    tag: "Stop 6",
    name: "Kilmainham Gaol",
    coord: [-6.3073, 53.3421],
    desc: "An 18th-century former prison that played a central role in Ireland's struggle for independence, including executions linked to the 1916 Easter Rising.",
    img: "/stops/kilmainham-gaol.jpg",
  },
  {
    id: 7,
    kind: "stop",
    tag: "Stop 7",
    name: "St Patrick's Tower",
    coord: [-6.2848, 53.3389],
    desc: "A former windmill, one of the tallest in Europe in its day, linked to a distillery that once produced millions of litres of whiskey a year — a great spot to talk about the history of Irish whiskey.",
    img: "/stops/st-patricks-tower.jpg",
  },
  {
    id: 8,
    kind: "stop",
    tag: "Stop 8",
    name: "Christ Church Cathedral",
    coord: [-6.2705, 53.3434],
    desc: "Founded in the 11th century, it stands at the heart of medieval Dublin. Striking Gothic architecture and a long history dating back to the Viking era.",
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

function popupHtml(stop: RouteStop): string {
  const media = stop.img
    ? `<div class="route-popup-media" style="background-image:url('${stop.img}')"></div>`
    : `<div class="route-popup-media route-popup-media--start">🚲</div>`;
  return `<div class="route-popup-card">${media}<div class="route-popup-body"><span class="route-popup-tag">${stop.tag}</span><h3>${stop.name}</h3><p>${stop.desc}</p></div></div>`;
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
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

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
          let routeAnim: ReturnType<typeof setInterval> | null = null;

          const playRoute = () => {
            const src = map.getSource("route");
            if (!src) return;
            if (routeAnim) clearInterval(routeAnim);
            let i = 1;
            src.setData({
              type: "Feature",
              geometry: { type: "LineString", coordinates: [] },
            });
            routeAnim = setInterval(() => {
              src.setData({
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: fullPath.slice(0, i),
                },
              });
              i += 4;
              if (i > fullPath.length) {
                if (routeAnim) clearInterval(routeAnim);
                src.setData({
                  type: "Feature",
                  geometry: { type: "LineString", coordinates: fullPath },
                });
              }
            }, 20);
          };
          playRouteRef.current = playRoute;

          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: { type: "LineString", coordinates: [] },
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

          try {
            map.addLayer({
              id: "sky",
              type: "sky",
              paint: {
                "sky-type": "atmosphere",
                "sky-atmosphere-sun-intensity": 10,
              },
            });
          } catch {
            // Map style doesn't support the sky layer — continue without it.
          }

          routeStops.forEach((stop) => {
            const el = document.createElement("div");
            el.className =
              "route-marker" + (stop.kind === "start" ? " is-start" : "");
            el.innerHTML = `<span>${
              stop.kind === "start" ? "🚲" : stop.id
            }</span>`;

            const popup = new maplibregl.Popup({
              offset: 26,
              maxWidth: "280px",
              className: "route-popup",
            }).setHTML(popupHtml(stop));

            new maplibregl.Marker({ element: el, anchor: "bottom" })
              .setLngLat(stop.coord)
              .setPopup(popup)
              .addTo(map);
          });

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

          playRoute();
          setStatus("ready");
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
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
            className="absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-gold px-5 py-2 text-sm font-bold text-brand-dark shadow-lg transition hover:scale-105"
          >
            ↻ Replay route
          </button>
        )}

        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
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
        .route-popup .maplibregl-popup-content {
          padding: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }
        .route-popup .maplibregl-popup-close-button {
          color: #fff;
          font-size: 18px;
          padding: 4px 8px;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }
        .route-popup-card {
          width: 240px;
          font-family: var(--font-geist-sans), Arial, sans-serif;
        }
        .route-popup-media {
          height: 130px;
          background-size: cover;
          background-position: center;
          background-color: #1a1a1a;
        }
        .route-popup-media--start {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
        }
        .route-popup-body {
          padding: 12px 14px 14px;
        }
        .route-popup-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #e1251b;
        }
        .route-popup-body h3 {
          margin: 4px 0 6px;
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .route-popup-body p {
          margin: 0;
          font-size: 12.5px;
          line-height: 1.45;
          color: #444;
        }
      `}</style>
    </div>
  );
}
