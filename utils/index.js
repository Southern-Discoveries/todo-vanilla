// Record<string, boolean>
export const catchProperties = (obj) => {
  for (const [key, conditional] of Object.entries(obj)) {
    if (conditional) return key;
  }
};
