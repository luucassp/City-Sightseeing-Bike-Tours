import Image from "next/image";
import BookingButton from "@/components/BookingButton";
import { getPopupSettings } from "@/lib/popup";

const options = [
  {
    name: "Traditional Bicycle",
    icon: "🚲",
    price: 35,
    description:
      "Ideal for experienced cyclists who enjoy pedalling while exploring the city.",
    photo: "/bikes/bicicleta-tradicional.png",
  },
  {
    name: "E-bike",
    icon: "⚡",
    price: 45,
    description:
      "Comfort and ease for all levels. Cruise up hills without breaking a sweat.",
    photo: "/bikes/e-bike.png",
  },
];

export default async function PricingCards() {
  const settings = await getPopupSettings();
  const discountPercent = settings.enabled ? settings.discountPercent : 0;

  return (
    <section className="relative overflow-hidden px-4 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-24 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-brand-dark">
          Which Bike Should You Choose?
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {options.map((opt) => {
            const discountedPrice =
              discountPercent > 0
                ? Math.round(opt.price * (1 - discountPercent / 100))
                : opt.price;

            return (
              <div
                key={opt.name}
                className="group rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-4xl">{opt.icon}</span>
                <h3 className="mt-2 text-xl font-bold text-brand-red">
                  {opt.name}
                </h3>
                <div className="mx-auto my-4 h-px w-16 border-t-2 border-dashed border-brand-gold" />
                <div className="relative h-40">
                  <div
                    aria-hidden
                    className="absolute inset-x-8 inset-y-4 rounded-full bg-brand-gold/10 blur-xl transition group-hover:bg-brand-gold/20"
                  />
                  <Image
                    src={opt.photo}
                    alt={opt.name}
                    fill
                    sizes="(min-width: 768px) 400px, 90vw"
                    className="relative object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4">
                  {discountPercent > 0 ? (
                    <>
                      <span className="mr-2 text-lg font-medium text-gray-400 line-through">
                        €{opt.price}
                      </span>
                      <span className="text-3xl font-extrabold text-brand-red">
                        €{discountedPrice}
                      </span>
                      <span className="ml-1 text-sm font-medium text-gray-500">
                        / person
                      </span>
                      <span className="mt-1 block text-sm font-bold text-brand-red">
                        Save €{opt.price - discountedPrice} ({discountPercent}%
                        off)
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-extrabold text-brand-dark">
                        €{opt.price}
                      </span>
                      <span className="ml-1 text-sm font-medium text-gray-500">
                        / person
                      </span>
                    </>
                  )}
                </p>
                <p className="mt-4 text-gray-600">{opt.description}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <BookingButton />
        </div>
      </div>
    </section>
  );
}
