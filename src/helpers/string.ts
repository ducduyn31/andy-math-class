import { isEmpty } from "@/helpers/valid";

export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const generateRegexString = (strings: string[]) => {
  const escaped = strings.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const joined = escaped.join("|");
  return `(${joined})`;
};

export const assureString = (value: unknown): string => {
  if (isEmpty(value) || typeof value !== "string") {
    return "";
  }
  return value;
};
