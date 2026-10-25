
import { createBrowserClient } from "@supabase/ssr";
import { parse, serialize } from "cookie";

const REMEMBER_SESSION_SECONDS = 60 * 60 * 24 * 30;
const REMEMBER_ME_KEY = "mwala-connect-remember-me";

function shouldRememberSession() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(REMEMBER_ME_KEY) === "true";
  } catch {
    return false;
  }
}

export function createClient(rememberMe?: boolean) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Missing Supabase environment variables. Check your .env.local file."
    );
  }

  // Only an explicit login choice updates the preference.
  // Other calls reuse the existing preference.
  if (typeof rememberMe === "boolean" && typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        REMEMBER_ME_KEY,
        String(rememberMe)
      );
    } catch {
      // Cookie handling below remains available if localStorage is blocked.
    }
  }

  return createBrowserClient(supabaseUrl, supabasePublishableKey, {
    isSingleton: true,

    cookies: {
      getAll() {
  if (typeof document === "undefined") {
    return [];
  }

  return Object.entries(parse(document.cookie)).flatMap(
    ([name, value]) =>
      typeof value === "string" ? [{ name, value }] : []
  );
},

      setAll(cookiesToSet) {
        if (typeof document === "undefined") {
          throw new Error(
            "Supabase browser cookies cannot be written outside the browser."
          );
        }

        const remember = shouldRememberSession();

        for (const { name, value, options } of cookiesToSet) {
          const cookieOptions = { ...options };

          // Preserve explicit cookie deletions during sign-out and cleanup.
          if (options.maxAge === 0) {
            document.cookie = serialize(name, value, cookieOptions);
            continue;
          }

          // Apply the selected lifetime to session writes and refreshes.
          delete cookieOptions.expires;

          if (remember) {
            cookieOptions.maxAge = REMEMBER_SESSION_SECONDS;
          } else {
            delete cookieOptions.maxAge;
          }

          document.cookie = serialize(name, value, cookieOptions);
        }
      },
    },
  });
}
