import "../global.css";

import { fontAssets } from "@/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(fontAssets);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [error, loaded]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#FFFFFF" },
        headerShadowVisible: false,
        headerTitleStyle: {
          color: "#0D132B",
          fontFamily: "Poppins-SemiBold",
        },
      }}
    />
  );
}
