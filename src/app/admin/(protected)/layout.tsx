import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { isAuthenticated } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-dvh bg-cream">
      <AdminHeader />
      <main className="py-10">{children}</main>
    </div>
  );
}
