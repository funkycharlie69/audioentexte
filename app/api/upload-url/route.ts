// app/api/upload-url/route.ts
import { NextRequest } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const accountId = process.env.R2_ACCOUNT_ID!
const accessKeyId = process.env.R2_ACCESS_KEY_ID!
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!
const bucket = process.env.R2_BUCKET_NAME!
const keyPrefix = process.env.R2_BUCKET_PREFIX ?? ""

const s3 = new S3Client({
  region: "auto", // requis côté R2
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`, // endpoint S3 R2
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true, // recommandé pour compat S3 R2
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const filename = searchParams.get("filename")
  const contentType = searchParams.get("contentType") || "application/octet-stream"
  const email = searchParams.get("email") || "anonymous"

  if (!filename) {
    return new Response(JSON.stringify({ error: "filename is required" }), { status: 400 })
  }

  // Clé d’objet : prefix/YYYYMMDD/<email-simplifié>-<timestamp>-<filename>
  const safeEmail = email.replace(/[^a-z0-9._-]/gi, "_").slice(0, 64)
  const date = new Date()
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, "0")
  const d = String(date.getUTCDate()).padStart(2, "0")
  const key = `${keyPrefix}${y}${m}${d}/${safeEmail}-${Date.now()}-${filename}`

  const cmd = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
    // (optionnel) ServerSideEncryption: "AES256"
  })

  // URL valable 5 minutes (300 s)
  const signedUrl = await getSignedUrl(s3, cmd, { expiresIn: 300 })

  return new Response(JSON.stringify({ url: signedUrl, key }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
