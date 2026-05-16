import type { LanguageId } from "@/types/learning";
import { create } from "zustand";

type LanguageStore = {
  selectedLanguageId: LanguageId;
  setSelectedLanguageId: (languageId: LanguageId) => void;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  selectedLanguageId: "spanish",
  setSelectedLanguageId: (languageId) => set({ selectedLanguageId: languageId }),
}));
