import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

// STUB: contact form general inquiry.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? "").trim();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }
    const ticketId = `tsh_${randomBytes(6).toString("hex")}`;
    console.log("[contact:stub]", { ticketId, body });
    return NextResponse.json({ ok: true, ticketId });
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
