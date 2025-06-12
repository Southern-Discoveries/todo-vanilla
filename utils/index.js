import { Buffer } from "buffer";

// Record<string, boolean>
export const catchProperties = (obj) => {
  for (const [key, conditional] of Object.entries(obj)) {
    if (conditional) return key;
  }
};

export const RANDOM_CHARACTER = () => {
  return (Math.random() + 1).toString(6).substring(7);
};

// handler JWT for encode
export const parseJWT = (token) => {
  const arr = token?.split(".");
  const base64Payload = (arr?.length || 0) > 1 ? arr?.[1] : undefined;

  const payload = base64Payload ? Buffer.from(base64Payload, "base64") : "{}";

  return JSON.parse(payload.toString());
};
