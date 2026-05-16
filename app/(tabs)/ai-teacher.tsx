import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AiTeacherScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      {/* AI Teacher Placeholder */}
      <View className="flex-1 items-center justify-center px-lingua-screen">
        <Text className="font-poppins-semibold text-[22px] leading-[30px] text-lingua-text-primary">
          AI Teacher
        </Text>
      </View>
    </SafeAreaView>
  );
}
