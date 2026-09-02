import "server-only";
import { resendProvider } from "@/lib/email/providers/resend";
import { logProvider } from "@/lib/email/providers/log";

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export type EmailProvider = {
  name: string;
  isConfigured: () => boolean;
  send: (message: EmailMessage) => Promise<{ ok: boolean; error?: string }>;
};

/**
 * Provider registry. Add Brevo / Mailchimp / Klaviyo by implementing
 * `EmailProvider` and registering it here — nothing else changes.
 */
const providers: Record<string, EmailProvider> = {
  resend: resendProvider,
  log: logProvider,
};

export function getEmailProvider(): EmailProvider {
  const configured = process.env.EMAIL_PROVIDER ?? "resend";
  const provider = providers[configured] ?? providers.log!;
  return provider.isConfigured() ? provider : providers.log!;
}

export async function sendEmail(
  message: EmailMessage,
): Promise<{ ok: boolean; error?: string }> {
  try {
    return await getEmailProvider().send(message);
  } catch (error) {
    console.error("[email] send failed", error);
    return { ok: false, error: "send_failed" };
  }
}
