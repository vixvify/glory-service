import { t } from "elysia";

export function parseStringOrArray(
  input: string | string[] | unknown,
): string[] {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((item) => String(item).trim()).filter(Boolean);
  }
  return String(input)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function coerceArray(value: unknown): string[] {
  if (value === undefined || value === null || value === "") {
    return [];
  }
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  const str = String(value).trim();
  if (str.startsWith("[") && str.endsWith("]")) {
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
    }
  }
  return str
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const tArrayCoerce = t
  .Transform(t.Union([t.String(), t.Array(t.String())]))
  .Decode((value) => coerceArray(value))
  .Encode((value) => value);

