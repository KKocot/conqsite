import type { IconType, IconDefinition } from "./types";

export const militaryIcons: IconDefinition[] = [
  { type: "infantry", symbol: "⚔️", label: "Infantry" },
  { type: "armor", symbol: "🛡️", label: "Armor" },
  { type: "artillery", symbol: "💥", label: "Artillery" },
  { type: "helicopter", symbol: "🚁", label: "Helicopter" },
  { type: "airforce", symbol: "✈️", label: "Air Force" },
  { type: "navy", symbol: "⚓", label: "Navy" },
  { type: "command", symbol: "⭐", label: "Command" },
  { type: "medical", symbol: "🩺", label: "Medical" },
  { type: "supply", symbol: "📦", label: "Supply" },
  { type: "unknown", symbol: "❓", label: "Unknown" },
];

export function getMilitaryIcon(type: string): IconDefinition {
  return militaryIcons.find((icon) => icon.type === type) || militaryIcons[0];
}
