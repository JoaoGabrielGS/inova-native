// utils/category-handler.ts

export function RemoveAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace("ç", "c")
    .toLowerCase()
    .trim();
}

export function CategoryColorHandler(
  category: string | undefined,
  type: "text" | "bg" | "border" = "text",
): string {
  if (!category) return type === "text" ? "text-white" : "bg-transparent";

  const normalized = RemoveAccents(category);

  if (normalized.includes("tecnologia")) return `${type}-blue-500`;
  if (normalized.includes("saude")) return `${type}-brand-red-9`;
  if (normalized.includes("negocio")) return `${type}-brand-green-6`;
  if (normalized.includes("educacao")) return `${type}-brand-primary-9`;
  if (normalized.includes("gastronomia")) return `${type}-brand-yellow-7`;
  if (normalized.includes("criativ")) return `${type}-brand-pink-1`;

  return `${type}-white`;
}
