import type { LearningUnit } from "@/types/learning";

export const units = [
  {
    id: "spanish-unit-1",
    languageId: "spanish",
    order: 1,
    title: "First Spanish Words",
    description: "Meet people, say hello, and say goodbye.",
    level: "beginner",
    lessonIds: ["spanish-greetings-1"],
  },
  {
    id: "french-unit-1",
    languageId: "french",
    order: 1,
    title: "First French Words",
    description: "Use simple polite greetings in French.",
    level: "beginner",
    lessonIds: ["french-greetings-1"],
  },
  {
    id: "japanese-unit-1",
    languageId: "japanese",
    order: 1,
    title: "First Japanese Words",
    description: "Practice short greetings for daily use.",
    level: "beginner",
    lessonIds: ["japanese-greetings-1"],
  },
] satisfies LearningUnit[];
