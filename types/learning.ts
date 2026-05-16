export type LanguageId = "spanish" | "french" | "japanese";

export type LessonLevel = "beginner" | "elementary" | "intermediate";

export type LessonKind =
  | "vocabulary"
  | "listening"
  | "speaking"
  | "conversation";

export type ActivityType =
  | "multiple-choice"
  | "translation"
  | "listen-repeat"
  | "speaking-practice"
  | "vocabulary-match";

export type LessonPhaseKind = "warm-up" | "teach" | "practice" | "review";

export type LearningLanguage = {
  id: LanguageId;
  name: string;
  nativeName: string;
  shortName: string;
  flagCode: string;
  flagUrl: string;
  description: string;
  accentColor: string;
  isAvailable: boolean;
};

export type LearningUnit = {
  id: string;
  languageId: LanguageId;
  order: number;
  title: string;
  description: string;
  level: LessonLevel;
  lessonIds: string[];
};

export type VocabularyItem = {
  id: string;
  nativeText: string;
  translatedText: string;
  pronunciation: string;
  exampleSentence: string;
};

export type LessonGoal = {
  id: string;
  text: string;
};

export type LessonPhase = {
  id: string;
  kind: LessonPhaseKind;
  title: string;
  description: string;
};

export type ActivityBase = {
  id: string;
  type: ActivityType;
  prompt: string;
  vocabularyIds: string[];
};

export type MultipleChoiceActivity = ActivityBase & {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctOption: string;
};

export type TranslationActivity = ActivityBase & {
  type: "translation";
  sourceText: string;
  correctAnswer: string;
};

export type ListenRepeatActivity = ActivityBase & {
  type: "listen-repeat";
  phrase: string;
  slowPhrase: string;
};

export type SpeakingPracticeActivity = ActivityBase & {
  type: "speaking-practice";
  expectedPhrase: string;
  coachingTip: string;
};

export type VocabularyMatchActivity = ActivityBase & {
  type: "vocabulary-match";
  pairs: {
    nativeText: string;
    translatedText: string;
  }[];
};

export type LessonActivity =
  | MultipleChoiceActivity
  | TranslationActivity
  | ListenRepeatActivity
  | SpeakingPracticeActivity
  | VocabularyMatchActivity;

export type AITeacherPrompt = {
  persona: string;
  lessonContext: string;
  teachingInstructions: string[];
  correctionStyle: string;
  closingPrompt: string;
};

export type Lesson = {
  id: string;
  languageId: LanguageId;
  unitId: string;
  order: number;
  title: string;
  description: string;
  level: LessonLevel;
  kind: LessonKind;
  estimatedMinutes: number;
  xpReward: number;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phases: LessonPhase[];
  activities: LessonActivity[];
  aiTeacherPrompt: AITeacherPrompt;
};
