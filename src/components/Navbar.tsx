"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/pontos-de-interesse", label: "Pontos de Interesse" },
  { href: "/o-tour", label: "O Tour" },
  { href: "/aluguer-privado", label: "Aluguer Privado" },
  { href: "/contacto", label: "Contacto" },
  { href: "/reservas", label: "Gerir Reserva" },
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

  // Só a home tem hero para "flutuar" por cima; nas outras páginas o menu
  // fica sempre sólido e no fluxo normal, senão o conteúdo (fundo claro)
  // ficaria escondido atrás dele.
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`z-50 transition-colors duration-300 ${
        isHome ? "fixed top-0 left-0 right-0" : "sticky top-0"
      } ${transparent ? "bg-transparent" : "bg-brand-red shadow-md"}`}
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
