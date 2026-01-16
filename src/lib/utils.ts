import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  const single = parts[0];
  return `${single[0]}${single[1] || ""}`.toUpperCase();
}

export function getColor(id?: number): string {
  const seed = id ? id : 42;

  const hue = (seed * 137.508) % 360;
  return `hsl(${Math.floor(hue)}, 70%, 50%)`;
}
