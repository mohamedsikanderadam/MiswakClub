import "server-only";
import type { EmailProvider } from "@/lib/email";

/**
 * Fallback provider used when no email provider is configured. Signups still
 * succeed; the confirmation is logged instead of sent.
 */
export const logProvider: EmailProvider = {
  name: "log",
  isConfigured: () => true,
  async send(message) {
    console.info(
      `[email:log] would send "${message.subject}" to ${message.to} (no provider configured)`,
    );
    return { ok: true };
  },
};
