"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Modal } from "@/components/ui/Modal";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { trackEvent } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

type WaitlistContextValue = {
  open: (source: string) => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist(): WaitlistContextValue {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error("useWaitlist must be used inside WaitlistProvider");
  }
  return context;
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(0);

  useEffect(() => {
    captureAttribution();
  }, []);

  const open = useCallback((source: string) => {
    trackEvent("waitlist_cta_clicked", { source });
    setSession((current) => current + 1);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        labelledBy="waitlist-modal-heading"
      >
        <WaitlistForm
          key={session}
          headingId="waitlist-modal-heading"
          source="modal"
          onDone={() => undefined}
        />
      </Modal>
    </WaitlistContext.Provider>
  );
}
