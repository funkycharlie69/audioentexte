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
    const ct = req.headers.get("content-type") || "";
    const body =
      ct.includes("application/json")
        ? await req.json()
        : Object.fromEntries((await req.formData()).entries());

    // 1) Email obligatoire
    const email = toStr((body as any).email).toLowerCase();
    if (!email) {
      return NextResponse.json({ ok: false, error: "email_required" }, { status: 400 });
    }

    // 2) Champs “identité campagne” (compat JSON + alias UTM)
    const source      = toStr((body as any).source) || "lp";
    const userGroup   = toStr((body as any).userGroup) || "waitlist";
    const campaign    = toStr((body as any).campaign ?? (body as any).utm_campaign);
    const content     = toStr((body as any).content  ?? (body as any).utm_content);
    const medium      = toStr((body as any).medium   ?? (body as any).utm_medium);
    const term        = toStr((body as any).term     ?? (body as any).utm_term);
    const utmSource   = toStr((body as any).utmSource ?? (body as any).utm_source); // nécessite une prop custom "utmSource" dans Loops si tu veux la garder distincte
    const landingPage = toStr((body as any).landingPage ?? (body as any).page);

    // 3) Nouvelles réponses post-email
    const hoursPerMonth = toStr((body as any).hoursPerMonth);
    const mainUseCase   = toStr((body as any).mainUseCase);
    const useCaseOther  = toStr((body as any).useCaseOther);

    // 4) Optionnels “profil”
    const firstName = toStr((body as any).firstName);
    const lastName  = toStr((body as any).lastName);
    const notes     = toStr((body as any).notes);
    const userId    = toStr((body as any).userId);

    // 5) `subscribed` : n’inclure que si explicitement fourni (sinon Loops laisse la valeur par défaut)
    const subRaw = (body as any).subscribed;
    const subscribed = typeof subRaw === "boolean" ? subRaw : undefined;

    // 6) Build payload (ne garde que les champs renseignés)
    const loopsPayload = pickDefined({
      email,
      source,
      userGroup,
      campaign,
      content,
      medium,
      term,
      utmSource,       // crée la propriété custom dans Loops si tu veux la conserver
      landingPage,
      hoursPerMonth: hoursPerMonth || undefined,
      mainUseCase:   mainUseCase   || undefined,
      useCaseOther:  mainUseCase === "autre" ? (useCaseOther || undefined) : undefined,
      firstName: firstName || undefined,
      lastName:  lastName  || undefined,
      notes:     notes     || undefined,
      userId:    userId    || undefined,
      subscribed, // inclus seulement si fourni
    });

    // 7) Upsert Loops
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
