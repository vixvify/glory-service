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
      // ignore and fall through
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

export interface MovieCrewInputItem {
  crewMemberId?: string | null;
  name?: string | null;
  email?: string | null;
}

function parseCrewItem(item: unknown): MovieCrewInputItem | null {
  if (!item) return null;
  if (typeof item === "object") {
    const obj = item as Record<string, unknown>;
    return {
      crewMemberId: typeof obj.crewMemberId === "string" ? obj.crewMemberId : null,
      name: typeof obj.name === "string" ? obj.name : null,
      email: typeof obj.email === "string" ? obj.email : null,
    };
  }
  if (typeof item === "string") {
    const str = item.trim();
    if (!str) return null;
    if (str.startsWith("{") && str.endsWith("}")) {
      try {
        const parsed = JSON.parse(str);
        return {
          crewMemberId: typeof parsed.crewMemberId === "string" ? parsed.crewMemberId : null,
          name: typeof parsed.name === "string" ? parsed.name : null,
          email: typeof parsed.email === "string" ? parsed.email : null,
        };
      } catch {
        // Fall through
      }
    }
    return {
      crewMemberId: null,
      name: str,
      email: null,
    };
  }
  return null;
}

export function coerceCrewArray(value: unknown): MovieCrewInputItem[] {
  if (value === undefined || value === null || value === "") {
    return [];
  }
  if (Array.isArray(value)) {
    return value
      .map(parseCrewItem)
      .filter((item): item is MovieCrewInputItem => item !== null);
  }
  if (typeof value === "string") {
    const str = value.trim();
    if (str.startsWith("[") && str.endsWith("]")) {
      try {
        const parsed = JSON.parse(str);
        if (Array.isArray(parsed)) {
          return parsed
            .map(parseCrewItem)
            .filter((item): item is MovieCrewInputItem => item !== null);
        }
      } catch {
        // ignore
      }
    }
    const parsedSingle = parseCrewItem(str);
    return parsedSingle ? [parsedSingle] : [];
  }
  const parsed = parseCrewItem(value);
  return parsed ? [parsed] : [];
}

export const tCrewArrayCoerce = t
  .Transform(
    t.Union([t.String(), t.Array(t.Unknown()), t.Record(t.String(), t.Unknown()), t.Null()]),
  )
  .Decode((value) => coerceCrewArray(value))
  .Encode((value) => value);

