import "../global.css";

import { fontAssets } from "@/theme";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "index",
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

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
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#FFFFFF" },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "#0D132B",
            fontFamily: "Poppins-SemiBold",
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="oauth-callback" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  );
}
