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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Only the home page has a hero for the menu to "float" over; on other
  // pages the menu is always solid and in normal flow, otherwise the
  // content (light background) would be hidden behind it.
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`z-50 transition-all duration-300 ${
        isHome ? "fixed top-0 left-0 right-0" : "sticky top-0"
      } ${
        transparent
          ? "bg-transparent"
          : "border-b border-black/5 bg-white/90 shadow-sm backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Sightseeing Bike Tours"
            width={370}
            height={148}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>
        <button
          className={`md:hidden ${transparent ? "text-white" : "text-brand-dark"}`}
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          ☰
        </button>
        <ul className="hidden gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-semibold transition ${
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
      </nav>
      {open && (
        <ul className="flex flex-col gap-2 border-t border-black/5 bg-white px-4 pb-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 text-brand-dark"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
