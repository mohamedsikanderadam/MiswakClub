import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { filterMembers, loadWaitlist, toCsv } from "@/lib/admin-data";

export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const { configured, members } = await loadWaitlist();
  if (!configured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const filtered = filterMembers(members, {
    query: searchParams.get("q") ?? undefined,
    country: searchParams.get("country") ?? undefined,
    frequency: searchParams.get("frequency") ?? undefined,
    source: searchParams.get("source") ?? undefined,
  });

  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(toCsv(filtered), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="miswak-club-waitlist-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
