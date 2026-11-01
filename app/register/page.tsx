import Link from "next/link";

import { getWardOptions } from "../../lib/supabase/data";
import RegisterForm from "./RegisterForm";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  let wards: Awaited<ReturnType<typeof getWardOptions>> = [];
  let wardsError = false;

  try {
    wards = await getWardOptions();
  } catch (error) {
    console.error("Unable to load registration wards:", error);
    wardsError = true;
  }

  if (wardsError || wards.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f2eb] px-4 py-12 text-[#10120f]">
        <section className="w-full max-w-lg rounded-2xl border border-[#e2dfd5] bg-white p-6 text-center shadow-sm sm:p-10">
          <h1 className="text-2xl font-bold tracking-tight">
            Registration temporarily unavailable
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#6e7069]">
            {wardsError
              ? "We couldn't load the ward information required for registration. Please try again later."
              : "There are currently no wards available for registration. Please try again later."}
          </p>

          <Link
            href="/"
            className="mt-6 inline-block text-sm font-semibold text-[#163f2b] underline underline-offset-4"
          >
            Return to Mwala Connect
          </Link>
        </section>
      </main>
    );
  }

  return <RegisterForm wards={wards} />;
}
