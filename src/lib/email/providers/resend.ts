import "server-only";
import type { EmailMessage, EmailProvider } from "@/lib/email";

/** Resend transport over its REST API — no SDK dependency required. */
export const resendProvider: EmailProvider = {
  name: "resend",
  isConfigured: () =>
    Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM),
  async send(message: EmailMessage) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: [message.to],
        subject: message.subject,
        html: message.html,
        text: message.text,
        ...(process.env.EMAIL_REPLY_TO
          ? { reply_to: process.env.EMAIL_REPLY_TO }
          : {}),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("[email:resend] failed", response.status, body);
      return { ok: false, error: `resend_${response.status}` };
    }
    return { ok: true };
  },
};
