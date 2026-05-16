import type { LearningLanguage } from "@/types/learning";

export const languages = [
  {
    id: "spanish",
    name: "Spanish",
    nativeName: "Espanol",
    shortName: "ES",
    flagCode: "es",
    flagUrl: "https://flagcdn.com/w320/es.png",
    description: "Start with friendly everyday greetings.",
    accentColor: "#FF6B35",
    isAvailable: true,
  },
  {
    id: "french",
    name: "French",
    nativeName: "Francais",
    shortName: "FR",
    flagCode: "fr",
    flagUrl: "https://flagcdn.com/w320/fr.png",
    description: "Practice polite phrases for first conversations.",
    accentColor: "#6C63FF",
    isAvailable: true,
  },
  {
    id: "japanese",
    name: "Japanese",
    nativeName: "Nihongo",
    shortName: "JA",
    flagCode: "jp",
    flagUrl: "https://flagcdn.com/w320/jp.png",
    description: "Learn simple greetings with clear pronunciation.",
    accentColor: "#FF4D6D",
    isAvailable: true,
  },
] satisfies LearningLanguage[];
