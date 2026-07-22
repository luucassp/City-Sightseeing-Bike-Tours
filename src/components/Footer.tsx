import Image from "next/image";
import Link from "next/link";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/the-tour", label: "The Tour" },
  { href: "/points-of-interest", label: "Bike Tour Stops" },
  { href: "/private-hire", label: "Private Hire" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms and Conditions" },
];

const partners = [
  {
    src: "/partners/logo-city-sightseeing-dublin.png",
    alt: "City Sightseeing Dublin",
    width: 480,
    height: 240,
    className: "h-14",
  },
  {
    src: "/partners/logo-etravel-group.png",
    alt: "e-Travel Group",
    width: 480,
    height: 144,
    className: "h-9",
  },
  {
    src: "/partners/logo-kayak.png",
    alt: "KAYAK",
    width: 480,
    height: 91,
    className: "h-8",
  },
];

function MenuBullet() {
  return (
    <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 border-brand-gold">
      <span className="h-1 w-1 rounded-full bg-brand-gold" />
    </span>
  );
}

function LegalBullet() {
  return (
    <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-white/60">
      <span className="h-1 w-1 rounded-full bg-white/60" />
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-dark py-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3">
        <div>
          <Image
            src="/logo.png"
            alt="Sightseeing Bike Tours"
            width={370}
            height={148}
            className="h-14 w-auto"
          />
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            <li>
              <a href="tel:+35319073265" className="hover:text-brand-gold">
                (01) 907 3265
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@sightseeingbiketours.com"
                className="hover:text-brand-gold"
              >
                hello@sightseeingbiketours.com
              </a>
            </li>
            <li>
              <address className="not-italic">
                Drury Street Multi-Storey Car Park (Bike Park), Dublin 2.
                Eircode: D02 PH26
              </address>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Menu</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 text-white/80 hover:text-brand-gold"
                >
                  <MenuBullet />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/csdublin/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-base font-bold text-white hover:bg-white/20"
            >
              f
            </a>
            <a
              href="https://www.instagram.com/citysightseeing_dublin/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.google.com/maps/place/Sightseeing+Bike+Tour/@53.341572,-6.2664848,17z/data=!3m1!4b1!4m6!3m5!1s0x48670c27e6878c2b:0x48728c568f5b6ed!8m2!3d53.3415688!4d-6.2639099!16s%2Fg%2F11b7ztwrcl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find us on Google Maps"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-base font-bold text-white hover:bg-white/20"
            >
              G
            </a>
          </div>

          <h3 className="mt-8 text-lg font-bold">Terms of Use and Sale</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 text-white/80 hover:text-brand-gold"
                >
                  <LegalBullet />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-white/10 px-4 pt-10">
        {partners.map((partner) => (
          <Image
            key={partner.alt}
            src={partner.src}
            alt={partner.alt}
            width={partner.width}
            height={partner.height}
            className={`w-auto ${partner.className}`}
          />
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Sightseeing Bike Tours. All rights
        reserved.
      </p>
    </footer>
  );
}
