import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="ds-screen items-center justify-center px-lingua-screen">
      <Text className="h2 text-lingua-purple">Lingua</Text>
      <Text className="body-md mt-2 text-center">
        Duolingo-inspired language learning
      </Text>
      <Link
        href="/onboarding"
        className="mt-6 rounded-lingua-lg bg-lingua-purple px-6 py-4 font-poppins-semibold text-white"
      >
        Open onboarding
      </Link>
    </View>
  );
}
