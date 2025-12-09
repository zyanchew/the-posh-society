export const CATEGORY_NAV = [
  { label: "All", value: "all" },
  { label: "Pants", value: "pants" },
  { label: "Polo Shirt", value: "polo_shirt" },
  { label: "T-Shirt", value: "t_shirt" },
  { label: "Shirt", value: "shirt" },
  { label: "Sweater", value: "sweater" },
  { label: "Cardigan", value: "cardigan" },
  { label: "Cap", value: "cap" },
  { label: "Others", value: "others" },
] as const;

export const VALID_CATEGORIES = CATEGORY_NAV
  .filter(c => c.value !== "all")
  .map(c => c.value) as readonly string[];
