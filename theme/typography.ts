export const typography = {
  h1: {
    role: "Page / Screen Title",
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    lineHeight: 38.4,
  },
  h2: {
    role: "Section Title",
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    lineHeight: 31.2,
  },
  h3: {
    role: "Card / Module Title",
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    lineHeight: 26,
  },
  h4: {
    role: "Subheading",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    lineHeight: 22.4,
  },
  bodyLarge: {
    role: "Important content",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    lineHeight: 25.6,
  },
  bodyMedium: {
    role: "Body text",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    lineHeight: 22.4,
  },
  bodySmall: {
    role: "Supporting text",
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    lineHeight: 20.8,
  },
  caption: {
    role: "Labels, meta text",
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    lineHeight: 15.4,
  },
} as const;

export type LinguaTypographyToken = keyof typeof typography;
