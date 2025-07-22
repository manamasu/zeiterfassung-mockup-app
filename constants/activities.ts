export const AKTIVITAETEN_LIST = [
  "Arbeit mit Klient",
  "Interne Planung",
  "Teammeeting",
  "Fortbildung",
] as const;

export type AktitvitaetType = (typeof AKTIVITAETEN_LIST)[number];

export const Aktivitaeten_META: Record<AktitvitaetType, { color: string }> = {
  "Arbeit mit Klient": { color: "#1976d2" },
  "Interne Planung": { color: "#388e3c" },
  Teammeeting: { color: "#7b1fa2" },
  Fortbildung: { color: "#0097a7" },
};

//Accessbile for Dropdown-Compatible format:
export const AKTIVITATEN_OPTIONS = AKTIVITAETEN_LIST.map((label) => ({
  label,
  value: label,
}));
