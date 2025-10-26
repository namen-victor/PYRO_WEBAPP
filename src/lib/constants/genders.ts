// Male & Female pinned first; rest alphabetically
export const GENDERS = [
  "Male",
  "Female",
  "Agender",
  "Genderqueer",
  "Intersex",
  "Non-binary",
  "Transgender Man",
  "Transgender Woman",
  "Two-Spirit",
  "Prefer not to say",
  "Self-describe"
] as const;

export type Gender = typeof GENDERS[number] | string; // Allow custom for "Self-describe"




