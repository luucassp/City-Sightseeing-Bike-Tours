"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { PopupSettings } from "@/lib/popup";

const STORAGE_KEY = "promo-popup-dismissed";
const SHOW_DELAY_MS = 900;

function interpolate(text: string, discountPercent: number) {
  return text.split("{percent}").join(String(discountPercent));
}

export default function PromoPopup({
  settings,
  discountPercent,
}: {
  settings: PopupSettings;
  discountPercent: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAdmin = pathname?.startsWith("/admin") ?? false;
  const isPreview = searchParams.get("previewPopup") === "1";
  const [visible, setVisible] = useState(isPreview);
  const dismissKey = `${settings.title}|${settings.message}|${settings.imageUrl}|${settings.ctaText}|${settings.ctaLink}`;

  useEffect(() => {
    if (isAdmin || isPreview) return;
    if (!settings.enabled) return;
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === dismissKey) return;

    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [dismissKey, isAdmin, isPreview, settings.enabled]);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function close() {
    setVisible(false);
    if (!isPreview) {
      window.sessionStorage.setItem(STORAGE_KEY, dismissKey);
    }
  }

  if (!visible) return null;

  const title = interpolate(settings.title, discountPercent);
  const message = interpolate(settings.message, discountPercent);
  const hasCta = settings.ctaText.trim() !== "" && settings.ctaLink.trim() !== "";
  const isExternalLink = /^https?:\/\//i.test(settings.ctaLink);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-popup-title"
      onClick={close}
    >
      {isPreview && (
        <div className="fixed top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-dark px-4 py-1.5 text-xs font-bold text-white shadow-lg">
          Preview mode — {settings.enabled ? "popup is ON" : "popup is OFF"}{" "}
          for real visitors
        </div>
      )}
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white text-center shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xl leading-none text-white transition hover:bg-black/80"
        >
          &times;
        </button>

        {settings.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={settings.imageUrl}
            alt=""
            className="h-48 w-full object-cover"
          />
        )}

        <div className="px-6 pb-6 pt-5">
          <h2
            id="promo-popup-title"
            className="text-xl font-extrabold leading-tight text-brand-red"
          >
            {title}
          </h2>
          {message && (
            <p className="mt-3 whitespace-pre-line text-gray-600">
              {message}
            </p>
          )}

          {hasCta ? (
            <a
              href={settings.ctaLink}
              onClick={close}
              target={isExternalLink ? "_blank" : undefined}
              rel={isExternalLink ? "noopener noreferrer" : undefined}
              className="mt-6 inline-block rounded-full bg-brand-red px-10 py-3 font-bold text-white shadow-lg transition hover:scale-105 hover:bg-brand-red-dark"
            >
              {settings.ctaText}
            </a>
          ) : (
            <button
              onClick={close}
              className="mt-6 inline-block rounded-full bg-brand-gold px-8 py-2.5 font-bold text-brand-dark shadow-lg transition hover:scale-105"
            >
              Got it
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
