import { uploadImage } from "@/lib/storage";

export type PointOfInterest = {
  id: number;
  position: number;
  tag: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  imageUrl: string;
};

type PointOfInterestRow = {
  id: number;
  position: number;
  tag: string;
  title: string;
  short_desc: string;
  long_desc: string;
  image_url: string;
};

const SELECT_FIELDS = "id,position,tag,title,short_desc,long_desc,image_url";

export const POINTS_OF_INTEREST_CACHE_TAG = "points-of-interest";

function restUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  return `${base}/rest/v1${path}`;
}

function fromRow(row: PointOfInterestRow): PointOfInterest {
  return {
    id: row.id,
    position: row.position,
    tag: row.tag,
    title: row.title,
    shortDesc: row.short_desc,
    longDesc: row.long_desc,
    imageUrl: row.image_url,
  };
}

// Public read, cached; ordered by position. Never throws: a Supabase outage
// must not take the marketing site down with it — callers should fall back
// to an empty list gracefully.
export async function getPointsOfInterest(): Promise<PointOfInterest[]> {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) return [];

  try {
    const res = await fetch(
      restUrl(`/points_of_interest?select=${SELECT_FIELDS}&order=position.asc`),
      {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        next: { revalidate: 30, tags: [POINTS_OF_INTEREST_CACHE_TAG] },
      },
    );

    if (!res.ok) return [];

    const rows = (await res.json()) as PointOfInterestRow[];
    return rows.map(fromRow);
  } catch {
    return [];
  }
}

// Same as getPointsOfInterest but always fresh — used by the admin editor.
export async function getPointsOfInterestFresh(): Promise<PointOfInterest[]> {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) return [];

  try {
    const res = await fetch(
      restUrl(`/points_of_interest?select=${SELECT_FIELDS}&order=position.asc`),
      {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        cache: "no-store",
      },
    );

    if (!res.ok) return [];

    const rows = (await res.json()) as PointOfInterestRow[];
    return rows.map(fromRow);
  } catch {
    return [];
  }
}

// Admin write for a single stop's editable fields (title/desc/image) — the
// route coordinates and grid layout stay defined in code, since marketing
// only edits text and photos, not the tour itself.
export async function updatePointOfInterest(
  id: number,
  fields: { title: string; shortDesc: string; longDesc: string; imageUrl: string },
): Promise<void> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  const res = await fetch(restUrl(`/points_of_interest?id=eq.${id}`), {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      title: fields.title,
      short_desc: fields.shortDesc,
      long_desc: fields.longDesc,
      image_url: fields.imageUrl,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update point of interest: ${res.status} ${text}`);
  }
}

export async function uploadPoiImage(file: File): Promise<string> {
  return uploadImage("site-media", "poi", file);
}
