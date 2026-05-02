import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

// STUB: accepts the candidate-apply payload and returns success.
// When the Express backend is ready, swap this for a multipart forward to
// POST {API_BASE_URL}/api/public/candidate-apply
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    let payload: Record<string, unknown> = {};
    if (contentType.includes("multipart/form-data")) {
      const fd = await req.formData();
      payload = Object.fromEntries(fd.entries());
    } else {
      payload = await req.json();
    }
    const email = String(payload.email ?? "").trim();
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "invalid_email" },
        { status: 400 }
      );
    }
    const ticketId = `tsh_${randomBytes(6).toString("hex")}`;
    console.log("[candidate-apply:stub]", { ticketId, email, payload });
    return NextResponse.json({ ok: true, ticketId });
  } catch (err) {
    console.error("[candidate-apply:stub] error", err);
    return NextResponse.json(
      { ok: false, error: "bad_request" },
      { status: 400 }
    );
  }
}
