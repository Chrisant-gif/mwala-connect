
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import AdminSignOutButton from "./AdminSignOutButton";

const navigation = [
  { label: "Overview", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login?next=%2Fadmin");
  }

  const { data: isAdmin, error: roleError } =
    await supabase.rpc("is_admin");

  if (roleError || isAdmin !== true) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#10120f] md:flex">
      <aside className="flex w-full shrink-0 flex-col bg-[#0d281b] text-[#f5f2eb] md:min-h-screen md:w-64">
        <div className="border-b border-white/10 px-6 py-7">
          <Link
            href="/admin"
            className="text-sm font-bold tracking-[0.16em]"
          >
            MWALA CONNECT
          </Link>

          <p className="mt-2 text-xs text-white/55">
            Administration
          </p>
        </div>

        <nav
          aria-label="Admin navigation"
          className="flex flex-wrap gap-2 p-4 md:flex-col"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg bg-white/10 px-4 py-3 text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 p-5">
          <p className="mb-3 break-all text-xs text-white/60">
            Signed in as {user.email}
          </p>

          <AdminSignOutButton />
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        {children}
      </main>
    </div>
  );
}
