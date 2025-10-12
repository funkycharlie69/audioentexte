// app/api/waitlist/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOOPS_UPSERT_URL = "https://app.loops.so/api/v1/contacts/update";

function toStr(v: unknown) {
  return (v ?? "").toString().trim();
}

function pickDefined(obj: Record<string, any>) {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== "" && v !== null) out[k] = v;
  }
  return out;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1) Email obligatoire
    const email = toStr((body as any).email).toLowerCase();
    if (!email) {
      return NextResponse.json({ ok: false, error: "email_required" }, { status: 400 });
    }

    // 2) Champs “identité campagne”
    const source      = toStr((body as any).source);
    const userGroup   = toStr((body as any).userGroup);
    const landingPage = toStr((body as any).landingPage);

    // 3) Champs "profil" de base
    const firstName = toStr((body as any).firstName);
    const lastName  = toStr((body as any).lastName);
    const companyName = toStr((body as any).companyName); // NOUVEAU CHAMP

    // 4) Réponses aux questions
    const jobRole     = toStr((body as any).jobRole);
    const companySize = toStr((body as any).companySize);
    
    // 5) Autres champs optionnels
    const hoursPerMonth = toStr((body as any).hoursPerMonth);
    const mainUseCase   = toStr((body as any).mainUseCase);
    const useCaseOther  = toStr((body as any).useCaseOther);
    const userId        = toStr((body as any).userId);

    // 6) `subscribed`
    const subRaw = (body as any).subscribed;
    const subscribed = typeof subRaw === "boolean" ? subRaw : undefined;

    // 7) Build payload
    const loopsPayload = pickDefined({
      email,
      firstName,
      lastName,
      companyName, // AJOUTÉ ICI
      source,
      userGroup,
      landingPage,
      jobRole,
      companySize,
      hoursPerMonth,
      mainUseCase,
      useCaseOther:  mainUseCase === "autre" ? useCaseOther : undefined,
      userId,
      subscribed,
    });

    // 8) Upsert Loops
    const res = await fetch(LOOPS_UPSERT_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
      },
      body: JSON.stringify(loopsPayload),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data?.success === false) {
      console.error("Loops API Error:", data);
      return NextResponse.json(
        { ok: false, error: "loops_error", details: data },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error("waitlist error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}