import "../global.css";

import { fontAssets } from "@/theme";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";

void SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const POSTHOG_API_KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY ?? "";
const POSTHOG_HOST =
  process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com";

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

if (!POSTHOG_API_KEY) {
  throw new Error(
    "Add EXPO_PUBLIC_POSTHOG_KEY to your .env file for PostHog analytics",
  );
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
    <PostHogProvider apiKey={POSTHOG_API_KEY} options={{ host: POSTHOG_HOST }}>
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
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen
            name="language-selection"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="oauth-callback"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </ClerkProvider>
    </PostHogProvider>
  );
}
