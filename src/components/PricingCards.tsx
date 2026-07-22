import Image from "next/image";
import BookingButton from "@/components/BookingButton";

const options = [
  {
    name: "Traditional Bicycle",
    price: "€35",
    description:
      "Ideal for experienced cyclists who enjoy pedalling while exploring the city.",
    photo: "/bikes/bicicleta-tradicional.png",
  },
  {
    name: "E-bike",
    price: "€45",
    description:
      "Comfort and ease for all levels. Cruise up hills without breaking a sweat.",
    photo: "/bikes/e-bike.png",
  },
];

export default function PricingCards() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold text-brand-dark">
        Which Bike Should You Choose?
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {options.map((opt) => (
          <div
            key={opt.name}
            className="rounded-2xl border border-gray-200 p-8 text-center shadow-sm transition hover:shadow-lg"
          >
            <h3 className="text-xl font-bold text-brand-red">{opt.name}</h3>
            <div className="mx-auto my-3 h-px w-16 border-t-2 border-dashed border-brand-gold" />
            <div className="relative h-40">
              <Image
                src={opt.photo}
                alt={opt.name}
                fill
                sizes="(min-width: 768px) 400px, 90vw"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-3xl font-extrabold">{opt.price}</p>
            <p className="mt-4 text-gray-600">{opt.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <BookingButton />
      </div>
    </section>
  );
}
