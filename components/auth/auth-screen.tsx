import { images } from "@/constants/images";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { VerificationModal } from "./verification-modal";

type AuthMode = "sign-up" | "sign-in";

type AuthScreenProps = {
  mode: AuthMode;
};

const authContent = {
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today",
    action: "Sign Up",
    footerText: "Already have an account?",
    footerAction: "Log in",
    footerHref: "/sign-in",
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Continue your language journey",
    action: "Sign In",
    footerText: "New to Lingua?",
    footerAction: "Sign up",
    footerHref: "/sign-up",
  },
} as const;

export function AuthScreen({ mode }: AuthScreenProps) {
  const [verificationVisible, setVerificationVisible] = useState(false);
  const content = authContent[mode];
  const isSignUp = mode === "sign-up";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-7 pb-4 pt-2">
          {/* Back Button */}
          <TouchableOpacity
            activeOpacity={0.75}
            className="h-9 w-9 justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={30} color="#050B24" />
          </TouchableOpacity>

          {/* Header */}
          <View className="mt-5">
            <Text className="font-poppins-bold text-[28px] leading-[36px] text-lingua-text-primary">
              {content.title}
            </Text>
            <Text className="mt-2 font-poppins-regular text-[16px] leading-[24px] text-[#6f7590]">
              {content.subtitle} ✨
            </Text>
          </View>

          {/* Mascot */}
          <View className="relative mt-1 h-[120px] items-center overflow-hidden">
            <Text className="absolute left-[82px] top-[36px] z-10 font-poppins-bold text-[18px] leading-[22px] text-[#FF8A00]">
              ✦
            </Text>
            <Text className="absolute right-[82px] top-[51px] z-10 font-poppins-bold text-[20px] leading-[24px] text-[#FFC94B]">
              ✦
            </Text>
            <Text className="absolute right-[50px] top-[35px] z-10 font-poppins-bold text-[18px] leading-[22px] text-[#69A7FF]">
              ✦
            </Text>
            <Image
              source={images.mascotAuth}
              resizeMode="contain"
              className="mt-1 h-[134px] w-[178px]"
            />
          </View>

          {/* Email Form */}
          <View className="-mt-2 gap-2.5">
            <View className="h-[62px] justify-center rounded-[17px] border border-[#E8EAF2] bg-white px-5">
              <Text className="font-poppins-medium text-[13px] leading-[18px] text-[#8288A1]">
                Email
              </Text>
              <TextInput
                placeholder="email@gmail.com"
                placeholderTextColor="#9AA0B8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={{
                  color: "#050B24",
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  lineHeight: 22,
                  marginTop: 4,
                  padding: 0,
                }}
              />
            </View>

            {isSignUp ? (
              <View className="h-[62px] flex-row items-center rounded-[17px] border border-[#E8EAF2] bg-white px-5">
                <View className="flex-1">
                  <Text className="font-poppins-medium text-[13px] leading-[18px] text-[#8288A1]">
                    Password
                  </Text>
                  <TextInput
                    placeholder="*********"
                    placeholderTextColor="#9AA0B8"
                    secureTextEntry
                    style={{
                      color: "#050B24",
                      fontFamily: "Poppins-Regular",
                      fontSize: 16,
                      lineHeight: 22,
                      marginTop: 4,
                      padding: 0,
                    }}
                  />
                </View>
                <Ionicons name="eye-outline" size={23} color="#79809B" />
              </View>
            ) : null}
          </View>

          {/* Main Action */}
          <TouchableOpacity
            activeOpacity={0.88}
            className="mt-4 h-[56px] items-center justify-center rounded-[17px] bg-lingua-deep-purple"
            onPress={() => setVerificationVisible(true)}
          >
            <Text className="font-poppins-semibold text-[18px] leading-[25px] text-white">
              {content.action}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="mt-5 flex-row items-center gap-4">
            <View className="h-px flex-1 bg-[#E8EAF2]" />
            <Text className="font-poppins-regular text-[14px] leading-[20px] text-[#70768F]">
              or continue with
            </Text>
            <View className="h-px flex-1 bg-[#E8EAF2]" />
          </View>

          {/* Social Buttons */}
          <View className="mt-3 gap-2.5">
            <TouchableOpacity
              activeOpacity={0.82}
              className="h-[52px] flex-row items-center rounded-[16px] border border-[#EEF0F5] bg-white px-9"
              onPress={() => setVerificationVisible(true)}
            >
              <FontAwesome name="google" size={25} color="#4285F4" />
              <Text className="flex-1 text-center font-poppins-medium text-[14px] leading-[20px] text-lingua-text-primary">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.82}
              className="h-[52px] flex-row items-center rounded-[16px] border border-[#EEF0F5] bg-white px-9"
              onPress={() => setVerificationVisible(true)}
            >
              <FontAwesome name="facebook" size={28} color="#1877F2" />
              <Text className="flex-1 text-center font-poppins-medium text-[14px] leading-[20px] text-lingua-text-primary">
                Continue with Facebook
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.82}
              className="h-[52px] flex-row items-center rounded-[16px] border border-[#EEF0F5] bg-white px-9"
              onPress={() => setVerificationVisible(true)}
            >
              <FontAwesome name="apple" size={30} color="#050B24" />
              <Text className="flex-1 text-center font-poppins-medium text-[14px] leading-[20px] text-lingua-text-primary">
                Continue with Apple
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <View className="mt-auto items-center pt-4">
            <Text className="font-poppins-regular text-[14px] leading-[22px] text-[#70768F]">
              {content.footerText}{" "}
              <Link
                href={content.footerHref}
                className="font-poppins-semibold text-lingua-deep-purple"
              >
                {content.footerAction}
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Verification Modal */}
      <VerificationModal
        visible={verificationVisible}
        onClose={() => setVerificationVisible(false)}
      />
    </SafeAreaView>
  );
}
