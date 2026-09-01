"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Logo } from "@/components/ui/Logo";

export function AdminHeader() {
  const router = useRouter();

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-forest/10 bg-white">
      <Container width="wide" className="flex items-center justify-between py-4">
        <Logo />
        <Button type="button" variant="secondary" size="sm" onClick={signOut}>
          Sign out
        </Button>
      </Container>
    </header>
  );
}
