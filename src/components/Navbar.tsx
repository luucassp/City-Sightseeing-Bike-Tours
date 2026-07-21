"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/pontos-de-interesse", label: "Pontos de Interesse" },
  { href: "/o-tour", label: "O Tour" },
  { href: "/aluguer-privado", label: "Aluguer Privado" },
  { href: "/contacto", label: "Contacto" },
  { href: "/reservas", label: "Gerir Reserva" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-brand-red">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-extrabold text-white">
          🚲 BikeTours
        </Link>
        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
        <ul className="hidden gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-semibold text-white hover:text-brand-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <ul className="flex flex-col gap-2 bg-brand-red-dark px-4 pb-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 text-white"
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
