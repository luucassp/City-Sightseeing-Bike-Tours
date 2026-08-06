import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SubmitButton from "@/components/SubmitButton";
import {
  ADMIN_SESSION_COOKIE,
  checkPassword,
  createSessionToken,
  isValidSessionToken,
} from "@/lib/admin-auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

async function loginAction(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    redirect("/admin?error=1");
  }

  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect("/admin");
}

async function logoutAction() {
  "use server";
  const jar = await cookies();
  jar.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin");
}

const dashboardCards = [
  {
    href: "/admin/marketing",
    eyebrow: "MARKETING",
    title: "Promotions & Popup",
    description:
      "Discount pricing shown on the site, and the announcement popup shown to visitors.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11 5.882V19.24a1.76 1.76 0 0 1-3.417.592l-2.147-6.15M18 13a3 3 0 1 0 0-6M5.436 13.683A4.001 4.001 0 0 1 7 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 0 1-1.564-.317Z"
      />
    ),
  },
  {
    href: "/admin/content",
    eyebrow: "CONTENT",
    title: "Branding & Points of Interest",
    description:
      "The site logo, and the text and photos for each of the 8 tour stops.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    ),
  },
];

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const jar = await cookies();
  const authed = isValidSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value);

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16">
        <h1 className="text-2xl font-bold text-brand-dark">Site Admin</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter the admin password to manage promotions and the popup.
        </p>
        <form action={loginAction} className="mt-6 flex flex-col gap-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoFocus
            className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-red focus:outline-none"
          />
          {params.error === "1" && (
            <p className="text-sm font-medium text-brand-red">
              Incorrect password. Try again.
            </p>
          )}
          <SubmitButton
            label="Log in"
            pendingLabel="Logging in…"
            className="self-start px-6 py-2.5 shadow"
          />
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-dark">Site Admin</h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm font-semibold text-gray-500 transition hover:text-brand-red active:text-brand-red-dark"
          >
            Log out
          </button>
        </form>
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Pick a section to manage. Each one opens on its own page.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {dashboardCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group block overflow-hidden rounded-2xl border border-gray-200 transition hover:shadow-md"
          >
            <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-brand-gold/25 to-brand-red/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-10 w-10 text-brand-red"
              >
                {card.icon}
              </svg>
              <p className="absolute top-0 left-0 bg-white px-3 py-1 font-medium text-[10px] text-black uppercase">
                {card.eyebrow}
              </p>
            </div>

            <div className="p-5">
              <h2 className="text-lg font-bold text-brand-dark">
                {card.title}
              </h2>
              <p className="mt-1.5 text-sm text-gray-500">
                {card.description}
              </p>

              <span className="mt-4 flex items-center font-semibold text-brand-red text-sm">
                <span className="relative mr-2 flex overflow-hidden rounded-full border border-gray-200 p-1.5 transition-colors duration-300 ease-in group-hover:bg-brand-red group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-3.5 w-3.5 translate-x-0 opacity-100 transition-all duration-500 ease-in group-hover:translate-x-8 group-hover:opacity-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="absolute top-1/2 -left-4 h-3.5 w-3.5 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:left-1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                Manage
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
