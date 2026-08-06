import Link from "next/link";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import type { Metadata } from "next";
import SubmitButton from "@/components/SubmitButton";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  POPUP_CACHE_TAG,
  getPopupSettingsFresh,
  updatePopupSettings,
  uploadPopupImage,
} from "@/lib/popup";
import {
  PROMOTION_CACHE_TAG,
  getPromotionFresh,
  updatePromotion,
} from "@/lib/promotion";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

async function savePromotionAction(formData: FormData) {
  "use server";
  await requireAdminSession();

  const rawPercent = Number(formData.get("percent") ?? 0);
  const percent = Number.isFinite(rawPercent)
    ? Math.min(100, Math.max(0, Math.round(rawPercent)))
    : 0;

  const current = await getPromotionFresh();
  await updatePromotion({
    active: formData.get("active") === "on",
    percent,
    startsAt: current.startsAt,
    endsAt: current.endsAt,
  });
  updateTag(PROMOTION_CACHE_TAG);

  redirect("/admin/marketing?saved=promotion");
}

async function savePopupAction(formData: FormData) {
  "use server";
  await requireAdminSession();

  let imageUrl = String(formData.get("imageUrl") ?? "").trim().slice(0, 500);
  const imageFile = formData.get("imageFile");
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      imageUrl = await uploadPopupImage(imageFile);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Image upload failed.";
      redirect(`/admin/marketing?imageError=${encodeURIComponent(message)}`);
    }
  }

  await updatePopupSettings({
    enabled: formData.get("enabled") === "on",
    title: String(formData.get("title") ?? "").trim().slice(0, 120),
    message: String(formData.get("message") ?? "").trim().slice(0, 500),
    imageUrl,
    ctaText: String(formData.get("ctaText") ?? "").trim().slice(0, 40),
    ctaLink: String(formData.get("ctaLink") ?? "").trim().slice(0, 500),
  });
  updateTag(POPUP_CACHE_TAG);

  redirect("/admin/marketing?saved=popup");
}

export default async function AdminMarketingPage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
    imageError?: string;
  }>;
}) {
  const params = await searchParams;
  await requireAdminSession();

  const [settings, promotion] = await Promise.all([
    getPopupSettingsFresh(),
    getPromotionFresh(),
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
        Promotions &amp; Popup
      </h1>

      {/* Promotion */}
      <section className="mt-8 rounded-2xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-brand-dark">Promotion</h2>
        <p className="mt-1 text-sm text-gray-500">
          Controls the bike prices shown on the site (crossed-out original +
          discounted price). Independent from the popup below — you can run
          a discount without showing a popup, or show a popup without a
          discount.
        </p>

        {params.saved === "promotion" && (
          <p className="mt-4 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
            Saved. Prices on the site are updated.
          </p>
        )}

        <form action={savePromotionAction} className="mt-4 flex flex-col gap-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="active"
              defaultChecked={promotion.active}
              className="h-5 w-5 accent-brand-red"
            />
            <span className="font-semibold text-brand-dark">
              Apply discount to prices
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-brand-dark">
              Discount %
            </span>
            <input
              type="number"
              name="percent"
              defaultValue={promotion.percent || ""}
              min={0}
              max={100}
              placeholder="e.g. 10"
              className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
            />
          </label>

          <SubmitButton
            label="Save promotion"
            pendingLabel="Saving…"
            className="self-start bg-brand-gold text-brand-dark shadow-lg hover:scale-105 hover:bg-brand-gold"
          />
        </form>
      </section>

      {/* Popup */}
      <section className="mt-8 rounded-2xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-brand-dark">Popup</h2>
        <p className="mt-1 text-sm text-gray-500">
          The announcement popup shown to visitors on every page. Write{" "}
          <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">
            {"{percent}"}
          </code>{" "}
          anywhere in the title or text and it&apos;s replaced with the
          current discount % from the Promotion section above — so the copy
          can never say a different number than the actual price.
        </p>
        <a
          href="/?previewPopup=1"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-semibold text-brand-red hover:underline"
        >
          Preview popup on the live site ↗
        </a>

        {params.saved === "popup" && (
          <p className="mt-4 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
            Saved. The popup is now updated on the live site.
          </p>
        )}
        {params.imageError && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-brand-red">
            {params.imageError}
          </p>
        )}

        <form
          action={savePopupAction}
          className="mt-4 flex flex-col gap-5"
        >
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="enabled"
              defaultChecked={settings.enabled}
              className="h-5 w-5 accent-brand-red"
            />
            <span className="font-semibold text-brand-dark">
              Show popup on the site
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-brand-dark">Title</span>
            <input
              type="text"
              name="title"
              defaultValue={settings.title}
              maxLength={120}
              placeholder="e.g. Summer Sale!"
              className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-brand-dark">Text</span>
            <textarea
              name="message"
              defaultValue={settings.message}
              maxLength={500}
              rows={4}
              placeholder="e.g. Book this week and save {percent}% on all tours."
              className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-brand-dark">
              Image <span className="font-normal text-gray-400">(optional)</span>
            </span>

            {settings.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.imageUrl}
                alt="Current popup image"
                className="h-40 w-full rounded-lg border border-gray-200 bg-gray-50 object-contain p-2"
              />
            )}

            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-gray-500">
                Upload a photo from your computer (JPEG, PNG, WEBP or GIF,
                max 1MB — keep it small, visitors open this on mobile data).
                Uploading replaces the current image.
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
                ...or paste a link to an image already hosted elsewhere
              </span>
              <input
                type="url"
                name="imageUrl"
                defaultValue={settings.imageUrl}
                maxLength={500}
                placeholder="https://..."
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
              />
            </label>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-semibold text-brand-dark">
              Button <span className="font-normal text-gray-400">(optional)</span>
            </p>
            <p className="mt-0.5 text-xs text-gray-500">
              Leave both blank to just show a &quot;Got it&quot; close button
              instead.
            </p>
            <div className="mt-3 flex flex-col gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-brand-dark">
                  Button text
                </span>
                <input
                  type="text"
                  name="ctaText"
                  defaultValue={settings.ctaText}
                  maxLength={40}
                  placeholder="e.g. Get tickets now"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-brand-dark">
                  Button link
                </span>
                <input
                  type="text"
                  name="ctaLink"
                  defaultValue={settings.ctaLink}
                  maxLength={500}
                  placeholder="e.g. /booking or https://..."
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
                />
              </label>
            </div>
          </div>

          <SubmitButton
            label="Save popup"
            pendingLabel="Saving…"
            className="self-start bg-brand-gold text-brand-dark shadow-lg hover:scale-105 hover:bg-brand-gold"
          />
        </form>
      </section>
    </div>
  );
}
