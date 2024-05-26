import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const fetchForm = async (
  username: string,
  setFormData: (data: any) => void
) => {
  try {
    const response = await fetch(`/api/survey/${username}`);
    const data = await response.json();
    setFormData(data.survey);
  } catch (error) {
    console.error("Error fetching:", error);
  }
};
