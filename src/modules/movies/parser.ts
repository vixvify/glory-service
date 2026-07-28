import { t } from "elysia";

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

export interface MovieCrewInputItemWithRole extends MovieCrewInputItem {
  role: string;
}

export function coerceCrewInput(value: unknown): MovieCrewInputItemWithRole[] {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  let parsedValue = value;
  if (typeof value === "string") {
    const str = value.trim();
    if ((str.startsWith("[") && str.endsWith("]")) || (str.startsWith("{") && str.endsWith("}"))) {
      try {
        parsedValue = JSON.parse(str);
        if (parsedValue && typeof parsedValue === "object" && !Array.isArray(parsedValue)) {
          if ("role" in parsedValue) {
            parsedValue = [parsedValue];
          }
        }
      } catch {
        return [];
      }
    } else {
      return [];
    }
  }

  if (typeof parsedValue === "object" && parsedValue !== null && !Array.isArray(parsedValue)) {
    if ("role" in parsedValue) {
      parsedValue = [parsedValue];
    }
  }

  const result: MovieCrewInputItemWithRole[] = [];

  if (Array.isArray(parsedValue)) {
    for (let item of parsedValue) {
      if (typeof item === "string") {
        try {
          item = JSON.parse(item);
        } catch {}
      }
      if (!item || typeof item !== "object") continue;
      const obj = item as Record<string, unknown>;
      const role = typeof obj.role === "string" ? obj.role.trim().toUpperCase() : "";
      if (!role) continue;

      const parsedItem = parseCrewItem(item);
      if (parsedItem) {
        result.push({
          role,
          crewMemberId: parsedItem.crewMemberId,
          name: parsedItem.name,
          email: parsedItem.email,
        });
      }
    }
    return result;
  }

  if (typeof parsedValue === "object" && parsedValue !== null) {
    const record = parsedValue as Record<string, unknown>;
    for (const [roleName, list] of Object.entries(record)) {
      const role = roleName.trim().toUpperCase();
      if (!role) continue;

      const items = coerceCrewArray(list);
      for (const item of items) {
        result.push({
          role,
          crewMemberId: item.crewMemberId,
          name: item.name,
          email: item.email,
        });
      }
    }
  }

  return result;
}

export const tCrewInputCoerce = t
  .Transform(
    t.Union([
      t.String(),
      t.Array(t.Unknown()),
      t.Record(t.String(), t.Unknown()),
      t.Null(),
      t.Undefined(),
    ]),
  )
  .Decode((value) => coerceCrewInput(value))
  .Encode((value) => value);

export interface Award {
  projectName: string;
  awardList: string[];
}

function parseAwardItem(item: unknown): Award | null {
  if (!item) return null;
  if (typeof item === "string") {
    try {
      const parsed = JSON.parse(item);
      return parseAwardItem(parsed);
    } catch {
      return null;
    }
  }
  if (typeof item === "object") {
    const obj = item as Record<string, unknown>;
    return {
      projectName: typeof obj.projectName === "string" ? obj.projectName : typeof obj.name === "string" ? obj.name : "",
      awardList: Array.isArray(obj.awardList)
        ? obj.awardList.map(String).filter(Boolean)
        : [],
    };
  }
  return null;
}

export function coerceAwardArray(value: unknown): Award[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map(parseAwardItem).filter((a): a is Award => a !== null);
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(parseAwardItem).filter((a): a is Award => a !== null);
      } else if (typeof parsed === "object" && parsed !== null) {
        const item = parseAwardItem(parsed);
        return item ? [item] : [];
      }
    } catch {
      return [];
    }
  }
  if (typeof value === "object" && value !== null) {
    const item = parseAwardItem(value);
    return item ? [item] : [];
  }
  return [];
}

export const tAwardArrayCoerce = t
  .Transform(
    t.Union([
      t.String(),
      t.Array(t.Unknown()),
      t.Record(t.String(), t.Unknown()),
      t.Null(),
      t.Undefined(),
    ]),
  )
  .Decode((value) => coerceAwardArray(value))
  .Encode((value) => value);

export interface AwardInput {
  projectName: string;
  awardName: string;
}
