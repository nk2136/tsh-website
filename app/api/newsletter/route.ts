import { NextResponse } from "next/server";

// STUB: returns ok without contacting any backend.
// When the Express backend is ready, swap this for a fetch-and-forward to
// POST {API_BASE_URL}/api/public/newsletter
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? "").trim();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }
    console.log("[newsletter:stub]", { email, source: body?.source });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
