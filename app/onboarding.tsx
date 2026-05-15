import { images } from "@/constants/images";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />
 
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-10 pb-10 pt-4">
          {/* Logo Header */}
          <View className="items-center">
            <View className="flex-row items-center gap-3">
              <Image
                source={images.mascotLogo}
                resizeMode="contain"
                className="h-[50px] w-[50px]"
              />
              <Text className="font-poppins-bold text-[35px] leading-[42px] text-lingua-text-primary">
                lingua
              </Text>
            </View>
          </View>

          {/* Hero Copy */}
          <View className="mt-12">
            <Text className="font-poppins-bold text-[39px] leading-[54px] text-lingua-text-primary">
              Your AI language{"\n"}
              <Text className="text-lingua-deep-purple">teacher.</Text>
            </Text>
            <Text className="mt-4 max-w-[310px] font-poppins-regular text-[18px] leading-[34px] text-[#626983]">
              Real conversations, personalized{"\n"}lessons, anytime, anywhere.
            </Text>
          </View>

          {/* Mascot Illustration */}
          <View className="mt-4 flex-1 items-center justify-center">
            <View className="relative h-[350px] w-full">
              <View className="absolute left-1 top-2 rotate-[-7deg] rounded-2xl bg-[#eef8ff] px-4 py-2">
                <Text className="font-poppins-bold text-[18px] leading-[24px] text-lingua-text-primary">
                  Hello!
                </Text>
                <View className="absolute -bottom-2 right-6 h-5 w-5 rotate-45 bg-[#eef8ff]" />
              </View>

              <View className="absolute right-3 top-1 rotate-[9deg] rounded-2xl bg-[#f7f5ff] px-4 py-2">
                <Text className="font-poppins-bold text-[18px] italic leading-[24px] text-lingua-deep-purple">
                  ¡Hola!
                </Text>
                <View className="absolute -bottom-2 left-6 h-5 w-5 rotate-45 bg-[#f7f5ff]" />
              </View>

              <View className="absolute right-0 top-[76px] rotate-[9deg] rounded-2xl bg-[#fff3ee] px-4 py-2">
                <Text className="font-poppins-bold text-[18px] leading-[24px] text-[#ff4d3d]">
                  你好!
                </Text>
                <View className="absolute -bottom-2 left-6 h-5 w-5 rotate-45 bg-[#fff3ee]" />
              </View>

              <Image
                source={images.mascotWelcome}
                resizeMode="contain"
                className="mt-2 h-[340px] w-full"
              />
            </View>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            className="h-[68px] flex-row items-center justify-center rounded-[20px] bg-lingua-deep-purple px-7"
            onPress={() => router.push("/sign-up")}
          >
            <Text className="flex-1 text-center font-poppins-semibold text-[22px] leading-[30px] text-white">
              Get Started
            </Text>
            <View className="h-8 w-8 items-center justify-center">
              <View className="h-[14px] w-[14px] rotate-45 border-r-[3px] border-t-[3px] border-white" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
