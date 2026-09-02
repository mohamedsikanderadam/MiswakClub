import { NextResponse } from "next/server";
import { features } from "@/config/site";
import { sendEmail } from "@/lib/email";
import { welcomeEmail } from "@/lib/email/templates/welcome";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { referralUrl } from "@/lib/referral";
import { fieldErrors, waitlistSchema } from "@/lib/validation";
import { joinWaitlist } from "@/lib/waitlist";

export type WaitlistResponse = {
  status: "created" | "duplicate" | "invalid" | "rate_limited" | "unavailable" | "error";
  referralUrl?: string;
  errors?: Record<string, string>;
};

export async function POST(request: Request) {
  const limit = rateLimit(`waitlist:${clientIp(request.headers)}`, 5, 60_000);
  if (!limit.allowed) {
    return NextResponse.json<WaitlistResponse>(
      { status: "rate_limited" },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<WaitlistResponse>(
      { status: "invalid", errors: { form: "Please check your details." } },
      { status: 400 },
    );
  }

  const parsed = waitlistSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json<WaitlistResponse>(
      { status: "invalid", errors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  // Honeypot: silently accept bots without writing to the database.
  if (parsed.data.company) {
    return NextResponse.json<WaitlistResponse>({ status: "created" });
  }

  const result = await joinWaitlist(parsed.data);

  switch (result.outcome) {
    case "created": {
      const link = features.enableReferrals
        ? referralUrl(result.user.referral_code)
        : undefined;

      // Confirmation email must never block or fail the signup response.
      await sendEmail(
        welcomeEmail({
          to: result.user.email,
          firstName: result.user.first_name,
          referralUrl: link,
        }),
      );

      return NextResponse.json<WaitlistResponse>({
        status: "created",
        referralUrl: link,
      });
    }
    case "duplicate":
      return NextResponse.json<WaitlistResponse>(
        {
          status: "duplicate",
          referralUrl:
            features.enableReferrals && result.referralCode
              ? referralUrl(result.referralCode)
              : undefined,
        },
        { status: 409 },
      );
    case "unavailable":
      return NextResponse.json<WaitlistResponse>(
        { status: "unavailable" },
        { status: 503 },
      );
    default:
      return NextResponse.json<WaitlistResponse>(
        { status: "error" },
        { status: 500 },
      );
  }
}
