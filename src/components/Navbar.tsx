"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/points-of-interest", label: "Points of Interest" },
  { href: "/the-tour", label: "The Tour" },
  { href: "/private-hire", label: "Private Hire" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Manage Booking" },
];

// Pages that open with a full-bleed dark band (hero video/image, or the
// diagonal photo marquee) the pill can float over transparently before the
// user scrolls past it. Every other page starts with light content, so the
// pill needs its solid glass surface immediately.
const DARK_BAND_PATHS = ["/", "/points-of-interest", "/the-tour", "/private-hire"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const hasDarkBand = DARK_BAND_PATHS.includes(pathname);

  useEffect(() => {
    if (!hasDarkBand) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkBand]);

  // Close the mobile menu automatically if the viewport grows past the
  // mobile breakpoint (e.g. rotating a tablet to landscape).
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const transparent = hasDarkBand && !scrolled;

  return (
    <header
      className={`inset-x-0 top-0 z-50 ${hasDarkBand ? "fixed" : "sticky"}`}
    >
      <div className="mx-auto max-w-5xl px-4 pt-3 sm:pt-4">
        <nav
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6 ${
            transparent
              ? "bg-transparent"
              : "bg-white/90 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur-md"
          }`}
        >
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Sightseeing Bike Tours"
              width={370}
              height={148}
              priority
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          <ul className="hidden gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-semibold transition active:scale-95 ${
                    transparent
                      ? "text-white hover:text-brand-gold"
                      : "text-brand-dark hover:text-brand-red"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className={`-mr-1 flex h-11 w-11 items-center justify-center rounded-full transition active:scale-90 md:hidden ${
              transparent
                ? "text-white active:bg-white/10"
                : "text-brand-dark active:bg-black/5"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </nav>

        <div
          className={`grid overflow-hidden transition-all duration-300 ease-out md:hidden ${
            open ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <ul className="min-h-0 overflow-hidden rounded-3xl bg-white/95 shadow-lg shadow-black/10 ring-1 ring-black/5 backdrop-blur-md">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-12 items-center px-6 font-semibold text-brand-dark transition active:bg-black/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
