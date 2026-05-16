import type { LanguageId } from "@/types/learning";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type LanguageStore = {
  selectedLanguageId: LanguageId | null;
  hasHydrated: boolean;
  setSelectedLanguageId: (languageId: LanguageId) => void;
  clearSelectedLanguage: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const languageStorageKey = "lingua-language-storage";

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      hasHydrated: false,
      setSelectedLanguageId: (languageId) =>
        set({ selectedLanguageId: languageId }),
      clearSelectedLanguage: () => set({ selectedLanguageId: null }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: languageStorageKey,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedLanguageId: state.selectedLanguageId,
      }),
      onRehydrateStorage: (state) => (_persistedState, error) => {
        if (error) {
          console.error("Failed to hydrate language storage", error);
        }

        state.setHasHydrated(true);
      },
    },
  ),
);
