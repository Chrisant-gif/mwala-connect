"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

const wards = [
  { id: 1, name: "Makutano/Mwala" },
  { id: 2, name: "Masii" },
  { id: 3, name: "Muthetheni" },
  { id: 4, name: "Wamunyu" },
  { id: 5, name: "Kibauni" },
  { id: 6, name: "Mbiuni" },
];

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [wardId, setWardId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Your passwords do not match.");
      return;
    }

    if (!wardId) {
      setErrorMessage("Please select your ward.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName.trim(),
            ward_id: Number(wardId),
          },
        },
      });

      if (error) {
        const message = error.message.toLowerCase();

        if (
          message.includes("already registered") ||
          message.includes("already been registered") ||
          message.includes("already exists")
        ) {
          setErrorMessage(
            "We couldn't create an account with those details. If you've registered before, try signing in."
          );
        } else {
          setErrorMessage(error.message);
        }

        return;
      }

      if (data.session) {
        setSuccessMessage(
          "Your account has been created successfully. You are now signed in."
        );
      } else {
        setSuccessMessage(
          "Your registration request was submitted. If email confirmation is enabled, check your inbox for a verification link before signing in."
        );
      }

      setPassword("");
      setConfirmPassword("");
    } catch {
      setErrorMessage(
        "Something went wrong while creating your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
          Join the community
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Create your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#6e7069]">
          Register to connect with development information and community
          activities across Mwala Constituency.
        </p>

        {errorMessage && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-900"
          >
            {successMessage}

            {dataSessionHint(successMessage) && (
              <p className="mt-3">
                <Link
                  href="/"
                  className="font-semibold underline underline-offset-4"
                >
                  Return to Mwala Connect
                </Link>
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium"
            >
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-[#d7d8d0] bg-white px-4 py-3 text-sm outline-none focus:border-[#163f2b] focus:ring-2 focus:ring-[#163f2b]/15"
            />
          </div>

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
              htmlFor="wardId"
              className="mb-2 block text-sm font-medium"
            >
              Your ward
            </label>
            <select
              id="wardId"
              name="wardId"
              required
              value={wardId}
              onChange={(event) => setWardId(event.target.value)}
              className="w-full rounded-lg border border-[#d7d8d0] bg-white px-4 py-3 text-sm outline-none focus:border-[#163f2b] focus:ring-2 focus:ring-[#163f2b]/15"
            >
              <option value="">Select your ward</option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-lg border border-[#d7d8d0] bg-white px-4 py-3 text-sm outline-none focus:border-[#163f2b] focus:ring-2 focus:ring-[#163f2b]/15"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Enter your password again"
              className="w-full rounded-lg border border-[#d7d8d0] bg-white px-4 py-3 text-sm outline-none focus:border-[#163f2b] focus:ring-2 focus:ring-[#163f2b]/15"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#163f2b] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0d281b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6e7069]">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#163f2b] underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-6 text-center text-xs leading-5 text-[#777970]">
          Your registration details will be stored securely in the Mwala
          Connect database.
        </p>
      </section>
    </main>
  );
}

function dataSessionHint(message: string) {
  return message.includes("You are now signed in");
}

