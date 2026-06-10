export const toBoolean = (val?: boolean | string): boolean =>
  val === true || String(val) === "true";
