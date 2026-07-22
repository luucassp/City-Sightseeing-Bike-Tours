import Link from "next/link";

export default function BookingButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Link
      href="/reservas"
      className={`inline-block rounded-full bg-brand-gold px-8 py-3 font-bold text-brand-dark shadow-lg transition hover:scale-105 ${className}`}
    >
      Reservar Bilhete
    </Link>
  );
}
