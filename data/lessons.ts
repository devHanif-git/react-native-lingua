import type { Lesson } from "@/types/learning";

export const lessons = [
  {
    id: "spanish-greetings-1",
    languageId: "spanish",
    unitId: "spanish-unit-1",
    order: 1,
    title: "Say Hello",
    description: "Learn basic Spanish greetings for a first conversation.",
    level: "beginner",
    kind: "speaking",
    estimatedMinutes: 4,
    xpReward: 10,
    goals: [
      {
        id: "spanish-greetings-goal-1",
        text: "Say hello and goodbye in Spanish.",
      },
      {
        id: "spanish-greetings-goal-2",
        text: "Recognize polite greeting words in a short prompt.",
      },
    ],
    vocabulary: [
      {
        id: "spanish-vocab-hola",
        nativeText: "Hola",
        translatedText: "Hello",
        pronunciation: "OH-lah",
        exampleSentence: "Hola, Ana.",
      },
      {
        id: "spanish-vocab-gracias",
        nativeText: "Gracias",
        translatedText: "Thank you",
        pronunciation: "GRAH-see-ahs",
        exampleSentence: "Gracias, Luis.",
      },
      {
        id: "spanish-vocab-adios",
        nativeText: "Adiós",
        translatedText: "Goodbye",
        pronunciation: "ah-DYOS",
        exampleSentence: "Adiós, Sofia.",
      },
    ],
    phases: [
      {
        id: "spanish-greetings-phase-1",
        kind: "warm-up",
        title: "Hear the greeting",
        description: "Listen to the teacher say each word slowly.",
      },
      {
        id: "spanish-greetings-phase-2",
        kind: "teach",
        title: "Learn the meaning",
        description: "Connect each Spanish word to its English meaning.",
      },
      {
        id: "spanish-greetings-phase-3",
        kind: "practice",
        title: "Say it back",
        description: "Repeat a simple greeting out loud.",
      },
      {
        id: "spanish-greetings-phase-4",
        kind: "review",
        title: "Quick check",
        description: "Answer one short review question.",
      },
    ],
    activities: [
      {
        id: "spanish-greetings-activity-1",
        type: "multiple-choice",
        prompt: "Choose the correct meaning.",
        vocabularyIds: ["spanish-vocab-hola"],
        question: "What does Hola mean?",
        options: ["Hello", "Goodbye", "Please"],
        correctOption: "Hello",
      },
      {
        id: "spanish-greetings-activity-2",
        type: "listen-repeat",
        prompt: "Listen, then repeat.",
        vocabularyIds: ["spanish-vocab-gracias"],
        phrase: "Gracias",
        slowPhrase: "Gra-ci-as",
      },
      {
        id: "spanish-greetings-activity-3",
        type: "translation",
        prompt: "Translate this word.",
        vocabularyIds: ["spanish-vocab-adios"],
        sourceText: "Adios",
        correctAnswer: "Goodbye",
      },
    ],
    aiTeacherPrompt: {
      persona: "You are a warm Spanish teacher for total beginners.",
      lessonContext:
        "The learner is practicing three first words: Hola, Gracias, and Adios.",
      teachingInstructions: [
        "Speak slowly and keep each sentence short.",
        "Model the phrase first, then ask the learner to repeat it.",
        "Use encouraging feedback after each attempt.",
      ],
      correctionStyle:
        "Correct only one pronunciation issue at a time and give a simple mouth-position tip.",
      closingPrompt:
        "Ask the learner to say one goodbye phrase before ending the lesson.",
    },
  },
  {
    id: "french-greetings-1",
    languageId: "french",
    unitId: "french-unit-1",
    order: 1,
    title: "Polite Hellos",
    description: "Learn beginner French greetings and polite words.",
    level: "beginner",
    kind: "listening",
    estimatedMinutes: 4,
    xpReward: 10,
    goals: [
      {
        id: "french-greetings-goal-1",
        text: "Understand common French greeting words.",
      },
      {
        id: "french-greetings-goal-2",
        text: "Practice one polite phrase out loud.",
      },
    ],
    vocabulary: [
      {
        id: "french-vocab-bonjour",
        nativeText: "Bonjour",
        translatedText: "Hello",
        pronunciation: "bohn-ZHOOR",
        exampleSentence: "Bonjour, Marie.",
      },
      {
        id: "french-vocab-merci",
        nativeText: "Merci",
        translatedText: "Thank you",
        pronunciation: "mehr-SEE",
        exampleSentence: "Merci, Paul.",
      },
      {
        id: "french-vocab-au-revoir",
        nativeText: "Au revoir",
        translatedText: "Goodbye",
        pronunciation: "oh ruh-VWAHR",
        exampleSentence: "Au revoir, Camille.",
      },
    ],
    phases: [
      {
        id: "french-greetings-phase-1",
        kind: "warm-up",
        title: "Listen first",
        description: "Hear each word at a natural speed.",
      },
      {
        id: "french-greetings-phase-2",
        kind: "teach",
        title: "Break it down",
        description: "Learn the meaning and pronunciation clue.",
      },
      {
        id: "french-greetings-phase-3",
        kind: "practice",
        title: "Match the words",
        description: "Pair each French phrase with English.",
      },
      {
        id: "french-greetings-phase-4",
        kind: "review",
        title: "Speak once",
        description: "Say one polite phrase with the teacher.",
      },
    ],
    activities: [
      {
        id: "french-greetings-activity-1",
        type: "vocabulary-match",
        prompt: "Match each phrase to its meaning.",
        vocabularyIds: [
          "french-vocab-bonjour",
          "french-vocab-merci",
          "french-vocab-au-revoir",
        ],
        pairs: [
          {
            nativeText: "Bonjour",
            translatedText: "Hello",
          },
          {
            nativeText: "Merci",
            translatedText: "Thank you",
          },
          {
            nativeText: "Au revoir",
            translatedText: "Goodbye",
          },
        ],
      },
      {
        id: "french-greetings-activity-2",
        type: "multiple-choice",
        prompt: "Choose the correct meaning.",
        vocabularyIds: ["french-vocab-merci"],
        question: "What does Merci mean?",
        options: ["Thank you", "Hello", "Good night"],
        correctOption: "Thank you",
      },
      {
        id: "french-greetings-activity-3",
        type: "speaking-practice",
        prompt: "Say this polite word.",
        vocabularyIds: ["french-vocab-bonjour"],
        expectedPhrase: "Bonjour",
        coachingTip: "Keep the final sound soft and rounded.",
      },
    ],
    aiTeacherPrompt: {
      persona: "You are a patient French teacher for new learners.",
      lessonContext:
        "The learner is practicing Bonjour, Merci, and Au revoir for the first time.",
      teachingInstructions: [
        "Use English for instructions and French for the target phrases.",
        "Give one clear example before asking the learner to speak.",
        "Celebrate correct meaning before coaching pronunciation.",
      ],
      correctionStyle:
        "Use gentle corrections and compare the sound to a simple English clue when helpful.",
      closingPrompt:
        "Have the learner say Bonjour and Merci together in one short exchange.",
    },
  },
  {
    id: "japanese-greetings-1",
    languageId: "japanese",
    unitId: "japanese-unit-1",
    order: 1,
    title: "Daily Greetings",
    description: "Learn simple Japanese greetings with romanized support.",
    level: "beginner",
    kind: "speaking",
    estimatedMinutes: 5,
    xpReward: 10,
    goals: [
      {
        id: "japanese-greetings-goal-1",
        text: "Recognize three common Japanese greetings.",
      },
      {
        id: "japanese-greetings-goal-2",
        text: "Repeat one phrase with simple pronunciation coaching.",
      },
    ],
    vocabulary: [
      {
        id: "japanese-vocab-konnichiwa",
        nativeText: "Konnichiwa",
        translatedText: "Hello",
        pronunciation: "kohn-nee-chee-wah",
        exampleSentence: "Konnichiwa, Yuki.",
      },
      {
        id: "japanese-vocab-arigato",
        nativeText: "Arigato",
        translatedText: "Thank you",
        pronunciation: "ah-ree-gah-toh",
        exampleSentence: "Arigato, Ken.",
      },
      {
        id: "japanese-vocab-sayonara",
        nativeText: "Sayonara",
        translatedText: "Goodbye",
        pronunciation: "sah-yoh-nah-rah",
        exampleSentence: "Sayonara, Hana.",
      },
    ],
    phases: [
      {
        id: "japanese-greetings-phase-1",
        kind: "warm-up",
        title: "Hear the rhythm",
        description: "Listen for the steady syllables in each greeting.",
      },
      {
        id: "japanese-greetings-phase-2",
        kind: "teach",
        title: "Learn the phrase",
        description: "See the English meaning and pronunciation guide.",
      },
      {
        id: "japanese-greetings-phase-3",
        kind: "practice",
        title: "Repeat slowly",
        description: "Say each syllable with the teacher.",
      },
      {
        id: "japanese-greetings-phase-4",
        kind: "review",
        title: "Pick the meaning",
        description: "Choose the right meaning for a greeting.",
      },
    ],
    activities: [
      {
        id: "japanese-greetings-activity-1",
        type: "listen-repeat",
        prompt: "Listen, then repeat.",
        vocabularyIds: ["japanese-vocab-konnichiwa"],
        phrase: "Konnichiwa",
        slowPhrase: "Kon-ni-chi-wa",
      },
      {
        id: "japanese-greetings-activity-2",
        type: "multiple-choice",
        prompt: "Choose the correct meaning.",
        vocabularyIds: ["japanese-vocab-arigato"],
        question: "What does Arigato mean?",
        options: ["Thank you", "Goodbye", "Hello"],
        correctOption: "Thank you",
      },
      {
        id: "japanese-greetings-activity-3",
        type: "speaking-practice",
        prompt: "Say this goodbye phrase.",
        vocabularyIds: ["japanese-vocab-sayonara"],
        expectedPhrase: "Sayonara",
        coachingTip: "Keep each syllable even and relaxed.",
      },
    ],
    aiTeacherPrompt: {
      persona: "You are a friendly Japanese teacher for total beginners.",
      lessonContext:
        "The learner is using romanized Japanese to practice Konnichiwa, Arigato, and Sayonara.",
      teachingInstructions: [
        "Say each phrase once naturally and once slowly.",
        "Clap or count syllables when the learner needs help with rhythm.",
        "Keep the lesson focused on confidence, not memorizing scripts.",
      ],
      correctionStyle:
        "Give short rhythm-focused feedback and ask for one repeat after the correction.",
      closingPrompt:
        "Ask the learner to choose one phrase they feel ready to use today.",
    },
  },
] satisfies Lesson[];
