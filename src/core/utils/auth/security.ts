import { config } from "../../config";

export interface JWTPayload {
  id: string;
  exp?: number;
  [key: string]: unknown;
}

export async function hashPassword(password: string): Promise<string> {
  return Bun.password.hash(password);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return Bun.password.verify(password, hash);
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str, "utf-8").toString("base64url");
}

function base64UrlDecode(str: string): string {
  return Buffer.from(str, "base64url").toString("utf-8");
}

function str2ab(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

export async function signJWT(
  payload: JWTPayload,
  secret: string = config.jwtSecret,
  expiresInSeconds = 86400,
): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    str2ab(secret).buffer as ArrayBuffer,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"],
  );
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    str2ab(dataToSign).buffer as ArrayBuffer,
  );
  const signatureBytes = new Uint8Array(signatureBuffer);
  const encodedSignature = Buffer.from(signatureBytes).toString("base64url");
  return `${dataToSign}.${encodedSignature}`;
}

export async function verifyJWT(
  token: string,
  secret: string = config.jwtSecret,
): Promise<JWTPayload> {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }
  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const dataToSign = `${encodedHeader}.${encodedPayload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    str2ab(secret).buffer as ArrayBuffer,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["verify"],
  );
  const signatureBytes = new Uint8Array(
    Buffer.from(encodedSignature, "base64url"),
  );
  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    signatureBytes.buffer as ArrayBuffer,
    str2ab(dataToSign).buffer as ArrayBuffer,
  );
  if (!isValid) {
    throw new Error("Invalid signature");
  }
  const payload = JSON.parse(base64UrlDecode(encodedPayload)) as JWTPayload;
  if (payload.exp && Date.now() / 1000 > payload.exp) {
    throw new Error("Token expired");
  }
  return payload;
}
