import { useAuth, useClerk } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="ds-screen items-center justify-center px-lingua-screen">
      {/* Home Header */}
      <Text className="h2 text-lingua-purple">Lingua</Text>
      <Text className="body-md mt-2 text-center">
        Duolingo-inspired language learning
      </Text>

      {/* Sign Out Button */}
      <TouchableOpacity
        activeOpacity={0.88}
        className="mt-6 rounded-lingua-lg bg-lingua-purple px-6 py-4"
        onPress={() => signOut()}
      >
        <Text className="font-poppins-semibold text-white">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
