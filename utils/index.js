// Record<string, boolean>
export const catchProperties = (obj) => {
  for (const [key, conditional] of Object.entries(obj)) {
    if (conditional) return key;
  }
};

export const RANDOM_CHARACTER = () => {
  return (Math.random() + 1).toString(6).substring(7);
};
