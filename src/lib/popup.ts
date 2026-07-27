export type PopupSettings = {
  enabled: boolean;
  title: string;
  message: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  discountPercent: number;
};

type PopupSettingsRow = {
  enabled: boolean;
  title: string;
  message: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  discount_percent: number;
};

const EMPTY_SETTINGS: PopupSettings = {
  enabled: false,
  title: "",
  message: "",
  imageUrl: "",
  ctaText: "",
  ctaLink: "",
  discountPercent: 0,
};

const SELECT_FIELDS =
  "enabled,title,message,image_url,cta_text,cta_link,discount_percent";

export const POPUP_CACHE_TAG = "popup-settings";

function restUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  return `${base}/rest/v1${path}`;
}

function fromRow(row: PopupSettingsRow): PopupSettings {
  return {
    enabled: row.enabled,
    title: row.title,
    message: row.message,
    imageUrl: row.image_url,
    ctaText: row.cta_text,
    ctaLink: row.cta_link,
    discountPercent: row.discount_percent,
  };
}

// Public read, cached and revalidated periodically so most page loads are
// served from the static cache; admin saves bust the cache immediately
// via updateTag(POPUP_CACHE_TAG). Never throws: a Supabase outage must
// not take the marketing site down with it.
export async function getPopupSettings(): Promise<PopupSettings> {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) return EMPTY_SETTINGS;

  try {
    const res = await fetch(
      restUrl(`/popup_settings?select=${SELECT_FIELDS}&id=eq.1`),
      {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        next: { revalidate: 30, tags: [POPUP_CACHE_TAG] },
      },
    );

    if (!res.ok) return EMPTY_SETTINGS;

    const rows = (await res.json()) as PopupSettingsRow[];
    return rows[0] ? fromRow(rows[0]) : EMPTY_SETTINGS;
  } catch {
    return EMPTY_SETTINGS;
  }
}

// Same as getPopupSettings but always fresh (no cache) — used by the admin
// editor so it never shows stale data after a save.
export async function getPopupSettingsFresh(): Promise<PopupSettings> {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) return EMPTY_SETTINGS;

  try {
    const res = await fetch(
      restUrl(`/popup_settings?select=${SELECT_FIELDS}&id=eq.1`),
      {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        cache: "no-store",
      },
    );

    if (!res.ok) return EMPTY_SETTINGS;

    const rows = (await res.json()) as PopupSettingsRow[];
    return rows[0] ? fromRow(rows[0]) : EMPTY_SETTINGS;
  } catch {
    return EMPTY_SETTINGS;
  }
}

// Admin write, using the service-role key so it bypasses RLS. This must only
// ever be called from server-side code (Server Actions / route handlers).
export async function updatePopupSettings(settings: PopupSettings): Promise<void> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  const res = await fetch(restUrl("/popup_settings?id=eq.1"), {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      enabled: settings.enabled,
      title: settings.title,
      message: settings.message,
      image_url: settings.imageUrl,
      cta_text: settings.ctaText,
      cta_link: settings.ctaLink,
      discount_percent: settings.discountPercent,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update popup settings: ${res.status} ${text}`);
  }
}

const IMAGE_BUCKET = "popup-images";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

// Uploads a marketing-provided image to Supabase Storage and returns its
// public URL. Server-only: uses the service-role key.
export async function uploadPopupImage(file: File): Promise<string> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Image must be a JPEG, PNG, WEBP, or GIF file.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 5MB or smaller.");
  }

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");

  const extension = file.type.split("/")[1] ?? "jpg";
  const path = `popup-${Date.now()}.${extension}`;

  const res = await fetch(
    `${base}/storage/v1/object/${IMAGE_BUCKET}/${path}`,
    {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": file.type,
      },
      body: await file.arrayBuffer(),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to upload image: ${res.status} ${text}`);
  }

  return `${base}/storage/v1/object/public/${IMAGE_BUCKET}/${path}`;
}
