import poppinsBold from "@/assets/fonts/Poppins-Bold.ttf";
import poppinsMedium from "@/assets/fonts/Poppins-Medium.ttf";
import poppinsRegular from "@/assets/fonts/Poppins-Regular.ttf";
import poppinsSemiBold from "@/assets/fonts/Poppins-SemiBold.ttf";

export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export const fontAssets = {
  [fontFamily.regular]: poppinsRegular,
  [fontFamily.medium]: poppinsMedium,
  [fontFamily.semiBold]: poppinsSemiBold,
  [fontFamily.bold]: poppinsBold,
} as const;
