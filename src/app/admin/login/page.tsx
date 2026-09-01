import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Container } from "@/components/ui/Layout";
import { Logo } from "@/components/ui/Logo";
import { isAdminConfigured, isAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <main className="flex min-h-dvh items-center bg-cream py-16">
      <Container width="narrow">
        <div className="mx-auto max-w-md rounded-lg border border-forest/10 bg-white p-8 shadow-soft">
          <Logo />
          <h1 className="mt-7 font-serif text-3xl text-forest">
            Waitlist dashboard
          </h1>
          {isAdminConfigured() ? (
            <AdminLoginForm />
          ) : (
            <p className="mt-4 rounded-md bg-sand/15 px-4 py-3 text-sm text-charcoal/80">
              Admin access is not configured. Set <code>ADMIN_PASSWORD</code>{" "}
              (12+ characters) in the environment and redeploy.
            </p>
          )}
        </div>
      </Container>
    </main>
  );
}
