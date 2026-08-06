import Link from "next/link";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import type { Metadata } from "next";
import SubmitButton from "@/components/SubmitButton";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  SITE_SETTINGS_CACHE_TAG,
  getSiteSettingsFresh,
  updateSiteSettings,
  uploadLogo,
} from "@/lib/site-settings";
import {
  POINTS_OF_INTEREST_CACHE_TAG,
  getPointsOfInterestFresh,
  updatePointOfInterest,
  uploadPoiImage,
} from "@/lib/points-of-interest";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

async function saveBrandingAction(formData: FormData) {
  "use server";
  await requireAdminSession();

  let logoUrl = String(formData.get("logoUrl") ?? "").trim().slice(0, 500);
  const logoFile = formData.get("logoFile");
  if (logoFile instanceof File && logoFile.size > 0) {
    try {
      logoUrl = await uploadLogo(logoFile);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logo upload failed.";
      redirect(`/admin/content?logoError=${encodeURIComponent(message)}`);
    }
  }

  await updateSiteSettings({ logoUrl });
  updateTag(SITE_SETTINGS_CACHE_TAG);

  redirect("/admin/content?saved=branding");
}

async function savePoiAction(formData: FormData) {
  "use server";
  await requireAdminSession();

  const id = Number(formData.get("id"));

  let imageUrl = String(formData.get("imageUrl") ?? "").trim().slice(0, 500);
  const imageFile = formData.get("imageFile");
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      imageUrl = await uploadPoiImage(imageFile);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Image upload failed.";
      redirect(`/admin/content?poiImageError=${encodeURIComponent(message)}`);
    }
  }

  await updatePointOfInterest(id, {
    title: String(formData.get("title") ?? "").trim().slice(0, 120),
    shortDesc: String(formData.get("shortDesc") ?? "").trim().slice(0, 200),
    longDesc: String(formData.get("longDesc") ?? "").trim().slice(0, 800),
    imageUrl,
  });
  updateTag(POINTS_OF_INTEREST_CACHE_TAG);

  redirect(`/admin/content?saved=poi-${id}`);
}

export default async function AdminContentPage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
    logoError?: string;
    poiImageError?: string;
  }>;
}) {
  const params = await searchParams;
  await requireAdminSession();

  const [siteSettings, pointsOfInterest] = await Promise.all([
    getSiteSettingsFresh(),
    getPointsOfInterestFresh(),
  ]);

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <Link
        href="/admin"
        className="text-sm font-semibold text-gray-500 transition hover:text-brand-red active:text-brand-red-dark"
      >
        ← Back to dashboard
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-dark">
        Branding &amp; Points of Interest
      </h1>

      {/* Branding */}
      <section className="mt-8 rounded-2xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-brand-dark">Branding</h2>
        <p className="mt-1 text-sm text-gray-500">
          The logo shown in the header and footer across the whole site.
          Leave empty to use the default logo.
        </p>

        {params.saved === "branding" && (
          <p className="mt-4 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
            Saved. The logo is now updated on the live site.
          </p>
        )}
        {params.logoError && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-brand-red">
            {params.logoError}
          </p>
        )}

        <form action={saveBrandingAction} className="mt-4 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-brand-dark">
              Logo <span className="font-normal text-gray-400">(optional)</span>
            </span>

            {siteSettings.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={siteSettings.logoUrl}
                alt="Current logo"
                className="h-24 w-full rounded-lg border border-gray-200 bg-gray-50 object-contain p-2"
              />
            )}

            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-gray-500">
                Upload a logo from your computer (JPEG, PNG, WEBP or GIF, max
                1MB). Uploading replaces the current logo everywhere on the
                site.
              </span>
              <input
                type="file"
                name="logoFile"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-brand-gold file:px-4 file:py-1.5 file:font-semibold file:text-brand-dark"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-gray-500">
                ...or paste a link to a logo already hosted elsewhere
              </span>
              <input
                type="url"
                name="logoUrl"
                defaultValue={siteSettings.logoUrl}
                maxLength={500}
                placeholder="https://..."
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
              />
            </label>
          </div>

          <SubmitButton
            label="Save branding"
            pendingLabel="Saving…"
            className="self-start bg-brand-gold text-brand-dark shadow-lg hover:scale-105 hover:bg-brand-gold"
          />
        </form>
      </section>

      {/* Points of Interest */}
      <section className="mt-8 rounded-2xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-brand-dark">
          Points of Interest
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          The photo and description shown for each of the 8 stops on the
          tour (on the Points of Interest page and the route map). The order
          of stops and the map route itself aren&apos;t editable here.
        </p>
        {params.poiImageError && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-brand-red">
            {params.poiImageError}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-4">
          {pointsOfInterest.map((point) => (
            <div
              key={point.id}
              id={`poi-${point.id}`}
              className="rounded-lg border border-gray-200 p-4"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-brand-red">
                {point.tag}
              </p>

              {params.saved === `poi-${point.id}` && (
                <p className="mt-2 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
                  Saved.
                </p>
              )}

              <form action={savePoiAction} className="mt-3 flex flex-col gap-4">
                <input type="hidden" name="id" value={point.id} />

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-brand-dark">
                    Title
                  </span>
                  <input
                    type="text"
                    name="title"
                    defaultValue={point.title}
                    maxLength={120}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-brand-dark">
                    Short description{" "}
                    <span className="font-normal text-gray-400">
                      (shown on the photo tile)
                    </span>
                  </span>
                  <textarea
                    name="shortDesc"
                    defaultValue={point.shortDesc}
                    maxLength={200}
                    rows={2}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-brand-dark">
                    Full description{" "}
                    <span className="font-normal text-gray-400">
                      (shown when expanded, and on the map)
                    </span>
                  </span>
                  <textarea
                    name="longDesc"
                    defaultValue={point.longDesc}
                    maxLength={800}
                    rows={4}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
                  />
                </label>

                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-brand-dark">
                    Photo
                  </span>

                  {point.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={point.imageUrl}
                      alt={`Current photo for ${point.title}`}
                      className="h-40 w-full rounded-lg border border-gray-200 bg-gray-50 object-contain p-2"
                    />
                  )}

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs text-gray-500">
                      Upload a photo from your computer (JPEG, PNG, WEBP or
                      GIF, max 1MB). Uploading replaces the current photo.
                    </span>
                    <input
                      type="file"
                      name="imageFile"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-brand-gold file:px-4 file:py-1.5 file:font-semibold file:text-brand-dark"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs text-gray-500">
                      ...or paste a link to a photo already hosted elsewhere
                    </span>
                    <input
                      type="text"
                      name="imageUrl"
                      defaultValue={point.imageUrl}
                      maxLength={500}
                      placeholder="https://..."
                      className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
                    />
                  </label>
                </div>

                <SubmitButton
                  label={`Save ${point.title}`}
                  pendingLabel="Saving…"
                  className="self-start bg-brand-gold text-brand-dark shadow-lg hover:scale-105 hover:bg-brand-gold"
                />
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
