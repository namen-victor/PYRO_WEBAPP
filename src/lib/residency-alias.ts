/**
 * Maps the generic "Permanent Resident" label to country-specific aliases
 * for better UX clarity
 */
export function residencyAliasForCountry(country: string): string {
  if (/United States/.test(country)) {
    return "Permanent Resident (Green Card)";
  }
  if (/United Kingdom/.test(country)) {
    return "Permanent Resident (ILR - Indefinite Leave to Remain)";
  }
  if (/Canada/.test(country)) {
    return "Permanent Resident (PR)";
  }
  if (/Australia|New Zealand/.test(country)) {
    return "Permanent Resident (PR)";
  }
  if (/Germany|France|Netherlands|Sweden|Spain|Italy|Poland/.test(country)) {
    return "Permanent Residence (EU Long-term Residence)";
  }
  if (/Nigeria|Ghana|Kenya|South Africa|Egypt|Morocco/.test(country)) {
    return "Permanent Resident (PR)";
  }
  return "Permanent Resident / Long-term Residence";
}













