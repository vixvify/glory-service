import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { config } from "../core/config";
import path from "path";

const { accountId, accessKeyId, secretAccessKey, bucketName, publicUrl } = config.r2;

const ALLOWED_EXTENSIONS = new Set([
  "jpg", "jpeg", "png", "gif", "webp", "svg",
  "mp4", "mov", "avi", "mkv", "webm",
  "pdf", "doc", "docx",
]);

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function getSafeExtension(filename: string): string {
  const ext = path.extname(filename).replace(".", "").toLowerCase();
  return ALLOWED_EXTENSIONS.has(ext) ? ext : "bin";
}

let s3Client: S3Client | null = null;
if (accountId && accessKeyId && secretAccessKey) {
  try {
    s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  } catch (err) {
    console.error("Failed to initialize Cloudflare R2 S3 client:", err);
  }
}

export async function uploadToR2(file: File, folder: string = "movies"): Promise<string> {
  if (!s3Client) {
    throw new Error(
      "Cloudflare R2 is not configured. Please check your R2 environment variables (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY).",
    );
  }

  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME is not configured.");
  }

  if (!publicUrl) {
    throw new Error("R2_PUBLIC_URL is not configured.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = getSafeExtension(file.name);
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    const basePublicUrl = publicUrl.endsWith("/") ? publicUrl.slice(0, -1) : publicUrl;
    return `${basePublicUrl}/${fileName}`;
  } catch (error: unknown) {
    throw new Error(`Failed to upload to Cloudflare R2: ${getErrorMessage(error)}`);
  }
}

export async function deleteFromR2(fileUrl: string): Promise<void> {
  if (!s3Client) {
    return;
  }

  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME is not configured.");
  }

  if (!publicUrl) {
    throw new Error("R2_PUBLIC_URL is not configured.");
  }

  const basePublicUrl = publicUrl.endsWith("/") ? publicUrl : `${publicUrl}/`;

  if (!fileUrl.startsWith(basePublicUrl)) {
    return;
  }

  const key = fileUrl.slice(basePublicUrl.length);

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error: unknown) {
    console.error(`Failed to delete object from Cloudflare R2: ${getErrorMessage(error)}`);
  }
}
