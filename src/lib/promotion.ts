export type Promotion = {
  active: boolean;
  percent: number;
  startsAt: string | null;
  endsAt: string | null;
};

type PromotionRow = {
  active: boolean;
  percent: number;
  starts_at: string | null;
  ends_at: string | null;
};

const EMPTY_PROMOTION: Promotion = {
  active: false,
  percent: 0,
  startsAt: null,
  endsAt: null,
};

const SELECT_FIELDS = "active,percent,starts_at,ends_at";

export const PROMOTION_CACHE_TAG = "promotion";

function restUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  return `${base}/rest/v1${path}`;
}

function fromRow(row: PromotionRow): Promotion {
  return {
    active: row.active,
    percent: row.percent,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
  };
}

// A promotion is only "live" when marked active AND (if set) the current
// time falls inside its start/end window. Use this everywhere instead of
// reading `.active`/`.percent` directly.
export function effectivePercent(promotion: Promotion, now = new Date()): number {
  if (!promotion.active) return 0;
  if (promotion.startsAt && now < new Date(promotion.startsAt)) return 0;
  if (promotion.endsAt && now > new Date(promotion.endsAt)) return 0;
  return promotion.percent;
}

// Public read, cached and revalidated periodically; admin saves bust the
// cache immediately via updateTag(PROMOTION_CACHE_TAG). Never throws: a
// Supabase outage must not take the marketing site down with it.
export async function getPromotion(): Promise<Promotion> {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) return EMPTY_PROMOTION;

  try {
    const res = await fetch(
      restUrl(`/promotions?select=${SELECT_FIELDS}&id=eq.1`),
      {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        next: { revalidate: 30, tags: [PROMOTION_CACHE_TAG] },
      },
    );

    if (!res.ok) return EMPTY_PROMOTION;

    const rows = (await res.json()) as PromotionRow[];
    return rows[0] ? fromRow(rows[0]) : EMPTY_PROMOTION;
  } catch {
    return EMPTY_PROMOTION;
  }
}

// Same as getPromotion but always fresh (no cache) — used by the admin
// editor so it never shows stale data after a save.
export async function getPromotionFresh(): Promise<Promotion> {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) return EMPTY_PROMOTION;

  try {
    const res = await fetch(
      restUrl(`/promotions?select=${SELECT_FIELDS}&id=eq.1`),
      {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        cache: "no-store",
      },
    );

    if (!res.ok) return EMPTY_PROMOTION;

    const rows = (await res.json()) as PromotionRow[];
    return rows[0] ? fromRow(rows[0]) : EMPTY_PROMOTION;
  } catch {
    return EMPTY_PROMOTION;
  }
}

// Admin write, using the service-role key so it bypasses RLS. Server-only.
export async function updatePromotion(promotion: Promotion): Promise<void> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  const res = await fetch(restUrl("/promotions?id=eq.1"), {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      active: promotion.active,
      percent: promotion.percent,
      starts_at: promotion.startsAt,
      ends_at: promotion.endsAt,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update promotion: ${res.status} ${text}`);
  }
}
