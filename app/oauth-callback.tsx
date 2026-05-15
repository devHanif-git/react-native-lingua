import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function OAuthCallbackScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Loading State */}
      <ActivityIndicator color="#6D4AFF" />
    </View>
  );
}
