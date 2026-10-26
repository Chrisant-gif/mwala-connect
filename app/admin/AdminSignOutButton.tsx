
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function AdminSignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignOut() {
    setIsSigningOut(true);
    setErrorMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        setErrorMessage("Sign-out failed. Please try again.");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setErrorMessage("Unable to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isSigningOut}
        className="w-full rounded-lg border border-white/20 px-4 py-2.5 text-left text-sm font-medium transition hover:bg-white/10 disabled:opacity-60"
      >
        {isSigningOut ? "Signing out..." : "Sign out"}
      </button>

      {errorMessage && (
        <p role="alert" className="mt-2 text-xs text-red-200">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
