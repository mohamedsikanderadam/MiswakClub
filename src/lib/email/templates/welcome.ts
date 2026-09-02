import type { EmailMessage } from "@/lib/email";
import { siteConfig } from "@/config/site";

const FOREST = "#183d2b";
const CREAM = "#f7f3ea";
const CHARCOAL = "#252a26";
const SAND = "#c59a5b";

export function welcomeEmail({
  to,
  firstName,
  referralUrl,
}: {
  to: string;
  firstName: string;
  referralUrl?: string;
}): EmailMessage {
  const subject = "You're in the Miswak Club";

  const referralHtml = referralUrl
    ? `<tr><td style="padding:0 32px 8px;font:400 15px/1.6 Helvetica,Arial,sans-serif;color:${CHARCOAL};">
         Want company? Share your personal link:
       </td></tr>
       <tr><td style="padding:8px 32px 28px;">
         <a href="${referralUrl}" style="font:600 15px/1.4 Helvetica,Arial,sans-serif;color:${FOREST};">${referralUrl}</a>
       </td></tr>`
    : "";

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${subject}</title></head>
<body style="margin:0;padding:0;background:${CREAM};">
  <div style="display:none;max-height:0;overflow:hidden;">Welcome to Miswak Club — fresh Miswak, delivered.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr><td style="background:${FOREST};padding:28px 32px;">
          <span style="font:400 20px/1 Georgia,serif;letter-spacing:0.14em;color:${CREAM};text-transform:uppercase;">Miswak</span>
          <span style="font:600 10px/1 Helvetica,Arial,sans-serif;letter-spacing:0.4em;color:${SAND};text-transform:uppercase;margin-left:6px;">Club</span>
        </td></tr>
        <tr><td style="padding:36px 32px 8px;font:400 28px/1.2 Georgia,serif;color:${FOREST};">You're in.</td></tr>
        <tr><td style="padding:8px 32px 20px;font:400 16px/1.7 Helvetica,Arial,sans-serif;color:${CHARCOAL};">
          ${escapeHtml(firstName)}, welcome to Miswak Club. You're on the waitlist, which means you'll be among the first to hear when early access opens.
        </td></tr>
        <tr><td style="padding:0 32px 24px;font:400 16px/1.7 Helvetica,Arial,sans-serif;color:${CHARCOAL};">
          We're building a simple subscription that keeps fresh Miswak within reach — choose your Miswak, choose your frequency, and replace it without having to remember.
        </td></tr>
        ${referralHtml}
        <tr><td style="padding:0 32px 36px;font:400 13px/1.6 Helvetica,Arial,sans-serif;color:#6b716c;">
          You're receiving this because you joined the Miswak Club waitlist at ${siteConfig.url}.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    "You're in.",
    "",
    `${firstName}, welcome to Miswak Club. You're on the waitlist, which means you'll be among the first to hear when early access opens.`,
    "",
    referralUrl ? `Share the Club: ${referralUrl}` : "",
    `You're receiving this because you joined the Miswak Club waitlist at ${siteConfig.url}.`,
  ]
    .filter(Boolean)
    .join("\n");

  return { to, subject, html, text };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
