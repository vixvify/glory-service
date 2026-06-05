import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { config } from "../core/config";

const { accountId, accessKeyId, secretAccessKey, bucketName, publicUrl } = config.r2;

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
      "Cloudflare R2 is not configured. Please check your R2 environment variables (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY)."
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

  const ext = file.name.split(".").pop() || "jpg";
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
  } catch (error: any) {
    throw new Error(`Failed to upload to Cloudflare R2: ${error.message}`);
  }
}

export async function resolveUploadedFiles(
  input: File | File[] | string | string[] | undefined | null,
  folder: string = "movies"
): Promise<string | undefined> {
  if (!input) {
    return undefined;
  }

  if (input instanceof File) {
    return await uploadToR2(input, folder);
  }

  if (typeof input === "string") {
    return input;
  }

  if (Array.isArray(input)) {
    const uploadPromises = input.map(async (item) => {
      if (item instanceof File) {
        return uploadToR2(item, folder);
      } else if (typeof item === "string") {
        return item;
      }
      return "";
    });
    const urls = await Promise.all(uploadPromises);
    return urls.filter(Boolean).join(",");
  }

  return undefined;
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

  // Extract the object key from the file URL.
  // The fileUrl should start with the configured publicUrl.
  const basePublicUrl = publicUrl.endsWith("/") ? publicUrl : `${publicUrl}/`;

  if (!fileUrl.startsWith(basePublicUrl)) {
    // URL does not belong to our R2 bucket (e.g. YouTube URL, external link), ignore deletion
    return;
  }

  const key = fileUrl.slice(basePublicUrl.length);

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error: any) {
    console.error(`Failed to delete object from Cloudflare R2: ${error.message}`);
  }
}
