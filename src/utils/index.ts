export const catchProperties = (obj: Record<string, any>) => {
  for (const [key, conditional] of Object.entries(obj)) {
    if (conditional) return key;
  }
};
