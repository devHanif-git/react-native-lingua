import { CustomTabBar } from "@/components/navigation/custom-tab-bar";
import { useLanguageStore } from "@/store/language-store";
import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId,
  );
  const hasHydratedLanguageStore = useLanguageStore(
    (state) => state.hasHydrated,
  );

  if (!isLoaded || !hasHydratedLanguageStore) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/language-selection" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="learn" options={{ title: "Learn" }} />
      <Tabs.Screen name="ai-teacher" options={{ title: "AI Teacher" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
