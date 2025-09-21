// app/api/waitlist/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Loops upsert endpoint (idempotent : crée ou met à jour le contact)
const LOOPS_UPSERT_URL = "https://app.loops.so/api/v1/contacts/update";

type BodyShape =
  | {
      email?: string;
      source?: string;          // ex: "lp_reunions_meta"
      userGroup?: string;       // ex: "waitlist"
      campaign?: string;        // UTM campaign
      content?: string;         // UTM content
      landingPage?: string;     // /reunions, /youtube...
      medium?: string;          // UTM medium
      term?: string;            // UTM term
      // alias côté client si tu les envoies encore sous "utm_*"
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      utm_content?: string;
      utm_term?: string;
      page?: string;            // alias pour landingPage
    }
  | Record<string, FormDataEntryValue>;

function toStr(v: unknown) {
  return (v ?? "").toString().trim();
}

export async function POST(req: Request) {
  try {
    // 1) Lire JSON OU FormData
    const ct = req.headers.get("content-type") || "";
    const body = (ct.includes("application/json")
      ? await req.json()
      : Object.fromEntries((await req.formData()).entries())) as BodyShape;

    // 2) Email (obligatoire)
    const email = toStr(body.email).toLowerCase();
    if (!email) {
      return NextResponse.json({ ok: false, error: "email_required" }, { status: 400 });
    }

    // 3) Récupérer les champs (prend d'abord la version “propre”, sinon les alias UTM)
    const source      = toStr((body as any).source) || "lp";
    const userGroup   = toStr((body as any).userGroup) || "waitlist";
    const utmSource   = toStr((body as any).utmSource || (body as any).utm_source);
    const campaign    = toStr((body as any).campaign || (body as any).utm_campaign);
    const content     = toStr((body as any).content  || (body as any).utm_content);
    const medium      = toStr((body as any).medium   || (body as any).utm_medium);
    const term        = toStr((body as any).term     || (body as any).utm_term);
    const landingPage = toStr((body as any).landingPage || (body as any).page);

    // 4) Construire le payload Loops selon TES propriétés
    //    (n’envoie pas les champs vides)
    const payload: Record<string, unknown> = {
      email,
      subscribed: true,     // IMPORTANT pour pouvoir envoyer des emails
      source,               // ex: "lp"
      userGroup,            // ex: "waitlist"
      utmSource,            // UTM source
      campaign,             // UTM campaign
      content,              // UTM content
      landingPage,          // ex: "/reunions"
      medium,               // UTM medium
      term,                 // UTM term
    };
    Object.keys(payload).forEach((k) => {
      const v = payload[k];
      if (v === "" || v == null) delete payload[k];
    });

    // 5) Appel Loops (server-side avec clé secrète)
    const res = await fetch(LOOPS_UPSERT_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ ok: false, error: "loops_error", details: txt }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
