
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();

        if (!isMounted) return;

        if (!error && data.user) {
          router.replace("/");
          router.refresh();
          return;
        }
      } catch {
        // Allow the login form to appear if the session check fails.
      }

      if (isMounted) {
        setIsCheckingSession(false);
      }
    }

    void checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const supabase = createClient(rememberMe);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        const message = error.message.toLowerCase();

        if (message.includes("email not confirmed")) {
          setErrorMessage(
            "Your email address has not been confirmed yet. Please open the confirmation link sent to your inbox."
          );
        } else if (
          message.includes("invalid login credentials") ||
          message.includes("invalid credentials")
        ) {
          setErrorMessage(
            "The email address or password is incorrect. Please check your details and try again."
          );
        } else {
          setErrorMessage(error.message);
        }

        return;
      }

      const requestedNext = new URLSearchParams(
        window.location.search
      ).get("next");

      const safeNext =
        requestedNext?.startsWith("/") &&
        !requestedNext.startsWith("//") &&
        !requestedNext.startsWith("/\\")
          ? requestedNext
          : "/";

      router.replace(safeNext);
      router.refresh();
    } catch {
      setErrorMessage(
        "We couldn't connect to the sign-in service. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f2eb] px-4 text-[#10120f]">
        <p
          role="status"
          className="text-sm font-medium text-[#163f2b]"
        >
          Checking your session...
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f2eb] px-4 py-12 text-[#10120f]">
      <section className="w-full max-w-lg rounded-2xl border border-[#e2dfd5] bg-white p-6 shadow-sm sm:p-10">
        <Link
          href="/"
          className="inline-block text-sm font-semibold tracking-wide text-[#163f2b]"
        >
          ← MWALA CONNECT
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#6e7069]">
          Welcome back
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Sign in to your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#6e7069]">
          Sign in to stay connected with development information and community
          activities across Mwala Constituency.
        </p>

        {errorMessage && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[#d7d8d0] bg-white px-4 py-3 text-sm outline-none focus:border-[#163f2b] focus:ring-2 focus:ring-[#163f2b]/15"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <div className="flex rounded-lg border border-[#d7d8d0] focus-within:border-[#163f2b] focus-within:ring-2 focus-within:ring-[#163f2b]/15">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="min-w-0 flex-1 rounded-l-lg bg-white px-4 py-3 text-sm outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="rounded-r-lg px-4 text-sm font-medium text-[#163f2b] hover:bg-[#f5f2eb]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-[#555850]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="mt-0.5 size-4 accent-[#163f2b]"
            />
            <span>
              <span className="font-medium text-[#10120f]">Remember me</span>
              <span className="mt-1 block text-xs leading-5 text-[#6e7069]">
                Keep my session on this device for longer.
              </span>
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#163f2b] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0d281b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6e7069]">
          New to Mwala Connect?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#163f2b] underline underline-offset-4"
          >
            Create an account
          </Link>
        </p>

        <p className="mt-6 text-center text-xs leading-5 text-[#777970]">
          Sign in using the email address you registered with.
        </p>
      </section>
    </main>
  );
}
