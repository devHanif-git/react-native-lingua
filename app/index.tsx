import { useAuth, useClerk } from "@clerk/expo";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const [signOutError, setSignOutError] = useState("");

  const handleSignOut = async () => {
    try {
      setSignOutError("");
      await signOut();
    } catch (error) {
      console.error("Failed to sign out", error);
      setSignOutError("Unable to sign out. Please try again.");
    }
  };

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

      {/* Language Selection Link */}
      <Link href="/language-selection" asChild>
        <TouchableOpacity
          activeOpacity={0.88}
          className="mt-6 rounded-lingua-lg border border-lingua-border px-6 py-4"
        >
          <Text className="font-poppins-semibold text-lingua-text-primary">
            Choose Language
          </Text>
        </TouchableOpacity>
      </Link>

      {/* Sign Out Error */}
      {signOutError ? (
        <Text className="body-sm mt-4 text-center text-red-500">
          {signOutError}
        </Text>
      ) : null}

      {/* Sign Out Button */}
      <TouchableOpacity
        activeOpacity={0.88}
        className="mt-4 rounded-lingua-lg bg-lingua-purple px-6 py-4"
        onPress={handleSignOut}
      >
        <Text className="font-poppins-semibold text-white">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
