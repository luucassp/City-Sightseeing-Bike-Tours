"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { PopupSettings } from "@/lib/popup";

const STORAGE_KEY = "promo-popup-dismissed";
const SHOW_DELAY_MS = 900;

export default function PromoPopup({ settings }: { settings: PopupSettings }) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;
  const dismissKey = `${settings.title}|${settings.message}|${settings.imageUrl}|${settings.ctaText}|${settings.ctaLink}`;

  useEffect(() => {
    if (isAdmin) return;
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === dismissKey) return;

    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [dismissKey, isAdmin]);

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
    window.sessionStorage.setItem(STORAGE_KEY, dismissKey);
  }

  if (!visible) return null;

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
            {settings.title}
          </h2>
          {settings.message && (
            <p className="mt-3 whitespace-pre-line text-gray-600">
              {settings.message}
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
