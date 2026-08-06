import { uploadImage } from "@/lib/storage";

export type SiteSettings = {
  logoUrl: string;
};

type SiteSettingsRow = {
  logo_url: string;
};

const EMPTY_SETTINGS: SiteSettings = { logoUrl: "" };

const SELECT_FIELDS = "logo_url";

export const SITE_SETTINGS_CACHE_TAG = "site-settings";

function restUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  return `${base}/rest/v1${path}`;
}

function fromRow(row: SiteSettingsRow): SiteSettings {
  return { logoUrl: row.logo_url };
}

// Public read, cached; falls back to the static /logo.png in <Navbar>/<Footer>
// whenever logoUrl is empty. Never throws: a Supabase outage must not take
// the marketing site down with it.
export async function getSiteSettings(): Promise<SiteSettings> {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) return EMPTY_SETTINGS;

  try {
    const res = await fetch(
      restUrl(`/site_settings?select=${SELECT_FIELDS}&id=eq.1`),
      {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        next: { revalidate: 30, tags: [SITE_SETTINGS_CACHE_TAG] },
      },
    );

    if (!res.ok) return EMPTY_SETTINGS;

    const rows = (await res.json()) as SiteSettingsRow[];
    return rows[0] ? fromRow(rows[0]) : EMPTY_SETTINGS;
  } catch {
    return EMPTY_SETTINGS;
  }
}

// Same as getSiteSettings but always fresh — used by the admin editor so it
// never shows stale data after a save.
export async function getSiteSettingsFresh(): Promise<SiteSettings> {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) return EMPTY_SETTINGS;

  try {
    const res = await fetch(
      restUrl(`/site_settings?select=${SELECT_FIELDS}&id=eq.1`),
      {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        cache: "no-store",
      },
    );

    if (!res.ok) return EMPTY_SETTINGS;

    const rows = (await res.json()) as SiteSettingsRow[];
    return rows[0] ? fromRow(rows[0]) : EMPTY_SETTINGS;
  } catch {
    return EMPTY_SETTINGS;
  }
}

// Admin write, using the service-role key so it bypasses RLS. Server-only.
export async function updateSiteSettings(settings: SiteSettings): Promise<void> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  const res = await fetch(restUrl("/site_settings?id=eq.1"), {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      logo_url: settings.logoUrl,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update site settings: ${res.status} ${text}`);
  }
}

export async function uploadLogo(file: File): Promise<string> {
  return uploadImage("site-media", "logo", file);
}
