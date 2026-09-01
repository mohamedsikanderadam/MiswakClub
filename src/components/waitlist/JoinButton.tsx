"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/Button";
import { useWaitlist } from "@/components/waitlist/WaitlistProvider";

/** Opens the waitlist modal and reports the click source to analytics. */
export function JoinButton({
  source,
  children,
  ...props
}: { source: string } & ComponentProps<typeof Button>) {
  const { open } = useWaitlist();
  return (
    <Button type="button" onClick={() => open(source)} {...props}>
      {children}
    </Button>
  );
}
