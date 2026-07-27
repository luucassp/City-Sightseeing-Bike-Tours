import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import type { Metadata } from "next";
import {
  ADMIN_SESSION_COOKIE,
  checkPassword,
  createSessionToken,
  isValidSessionToken,
} from "@/lib/admin-auth";
import {
  POPUP_CACHE_TAG,
  getPopupSettingsFresh,
  updatePopupSettings,
  uploadPopupImage,
} from "@/lib/popup";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

async function loginAction(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    redirect("/admin?error=1");
  }

  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect("/admin");
}

async function logoutAction() {
  "use server";
  const jar = await cookies();
  jar.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin");
}

async function saveAction(formData: FormData) {
  "use server";
  const jar = await cookies();
  if (!isValidSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value)) {
    redirect("/admin");
  }

  let imageUrl = String(formData.get("imageUrl") ?? "").trim().slice(0, 500);
  const imageFile = formData.get("imageFile");
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      imageUrl = await uploadPopupImage(imageFile);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Image upload failed.";
      redirect(`/admin?imageError=${encodeURIComponent(message)}`);
    }
  }

  const rawDiscount = Number(formData.get("discountPercent") ?? 0);
  const discountPercent = Number.isFinite(rawDiscount)
    ? Math.min(100, Math.max(0, Math.round(rawDiscount)))
    : 0;

  await updatePopupSettings({
    enabled: formData.get("enabled") === "on",
    title: String(formData.get("title") ?? "").trim().slice(0, 120),
    message: String(formData.get("message") ?? "").trim().slice(0, 500),
    imageUrl,
    ctaText: String(formData.get("ctaText") ?? "").trim().slice(0, 40),
    ctaLink: String(formData.get("ctaLink") ?? "").trim().slice(0, 500),
    discountPercent,
  });
  updateTag(POPUP_CACHE_TAG);

  redirect("/admin?saved=1");
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string; imageError?: string }>;
}) {
  const params = await searchParams;
  const jar = await cookies();
  const authed = isValidSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value);

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16">
        <h1 className="text-2xl font-bold text-brand-dark">Site Popup Admin</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter the admin password to manage the announcement popup.
        </p>
        <form action={loginAction} className="mt-6 flex flex-col gap-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoFocus
            className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
          />
          {params.error === "1" && (
            <p className="text-sm font-medium text-brand-red">
              Incorrect password. Try again.
            </p>
          )}
          <button
            type="submit"
            className="rounded-full bg-brand-red px-6 py-2.5 font-bold text-white shadow transition hover:bg-brand-red-dark"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }

  const settings = await getPopupSettingsFresh();

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-dark">Site Popup Admin</h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm font-semibold text-gray-500 hover:text-brand-red"
          >
            Log out
          </button>
        </form>
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Control the announcement popup shown to visitors on every page.
        Changes go live immediately after saving.
      </p>

      {params.saved === "1" && (
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
        action={saveAction}
        encType="multipart/form-data"
        className="mt-6 flex flex-col gap-5"
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
          <span className="text-sm font-semibold text-brand-dark">
            Discount %{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </span>
          <input
            type="number"
            name="discountPercent"
            defaultValue={settings.discountPercent || ""}
            min={0}
            max={100}
            placeholder="e.g. 10"
            className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
          />
          <span className="text-xs text-gray-500">
            While the popup above is on, this also updates the bike prices
            on the site to show the discount (crossed-out original price +
            new price). Leave at 0 to keep prices as-is.
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
            placeholder="e.g. Book this week and save 10% on all tours."
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
              className="h-32 w-full rounded-lg object-cover"
            />
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-gray-500">
              Upload a photo from your computer (JPEG, PNG, WEBP or GIF, max
              5MB). Uploading replaces the current image.
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

        <button
          type="submit"
          className="rounded-full bg-brand-gold px-8 py-3 font-bold text-brand-dark shadow-lg transition hover:scale-105 self-start"
        >
          Save
        </button>
      </form>
    </div>
  );
}
