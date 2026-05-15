import { images } from "@/constants/images";
import { useSignIn, useSignUp, useSSO } from "@clerk/expo";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";

import { VerificationModal } from "./verification-modal";

WebBrowser.maybeCompleteAuthSession();

type AuthMode = "sign-up" | "sign-in";
type VerificationMode = AuthMode | "sign-in-mfa";

type AuthScreenProps = {
  mode: AuthMode;
};

type SocialStrategy = "oauth_google" | "oauth_facebook" | "oauth_apple";

type AuthError = {
  message?: string;
  errors?: {
    code?: string;
    longMessage?: string;
    message?: string;
    meta?: {
      paramName?: string;
    };
  }[];
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

function getAuthErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null) {
    const authError = error as AuthError;

    if (authError.errors?.[0]?.longMessage) {
      return authError.errors[0].longMessage;
    }

    if (authError.errors?.[0]?.message) {
      return authError.errors[0].message;
    }

    if (authError.message) {
      return authError.message;
    }
  }

  return "Something went wrong. Please try again.";
}

function getAuthErrorField(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return "form";
  }

  const firstError = (error as AuthError).errors?.[0];
  const fieldName = firstError?.meta?.paramName?.toLowerCase() ?? "";
  const message = `${firstError?.message ?? ""} ${firstError?.longMessage ?? ""}`.toLowerCase();

  if (fieldName.includes("password") || message.includes("password")) {
    return "password";
  }

  if (
    fieldName.includes("email") ||
    fieldName.includes("identifier") ||
    message.includes("email") ||
    message.includes("identifier")
  ) {
    return "email";
  }

  return "form";
}

export function AuthScreen({ mode }: AuthScreenProps) {
  const { signIn, fetchStatus: signInFetchStatus } = useSignIn();
  const { signUp, fetchStatus: signUpFetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [verificationMessage, setVerificationMessage] = useState(
    "You have received an email. Enter the verification code to continue.",
  );
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [verificationMode, setVerificationMode] = useState<VerificationMode>(mode);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const content = authContent[mode];
  const isSignUp = mode === "sign-up";
  const isLoading =
    signInFetchStatus === "fetching" ||
    signUpFetchStatus === "fetching" ||
    isSocialLoading ||
    isVerifying;
  const canSubmit = isSignUp
    ? emailAddress.trim().length > 0 && password.length > 0 && !isLoading
    : emailAddress.trim().length > 0 && !isLoading;

  function clearErrors() {
    setEmailError("");
    setPasswordError("");
    setFormError("");
    setVerificationError("");
  }

  function showAuthError(error: unknown, fallbackField: "email" | "password" | "form" = "form") {
    const message = getAuthErrorMessage(error);
    const field = getAuthErrorField(error);
    const targetField = field === "form" ? fallbackField : field;

    if (targetField === "password") {
      setPasswordError(message);
      return;
    }

    if (targetField === "email") {
      setEmailError(message);
      return;
    }

    setFormError(message);
  }

  async function finalizeAuth() {
    const result =
      verificationMode === "sign-up"
        ? await signUp.finalize()
        : await signIn.finalize();

    if (result.error) {
      setVerificationError(getAuthErrorMessage(result.error));
      return false;
    }

    router.replace("/");
    return true;
  }

  async function handleEmailAuth() {
    clearErrors();

    if (!canSubmit) {
      return;
    }

    try {
      if (isSignUp) {
        const signUpResult = await signUp.password({
          emailAddress: emailAddress.trim(),
          password,
        });

        if (signUpResult.error) {
          showAuthError(signUpResult.error, "password");
          return;
        }

        if (signUp.status === "complete") {
          await finalizeAuth();
          return;
        }

        const emailCodeResult = await signUp.verifications.sendEmailCode();

        if (emailCodeResult.error) {
          showAuthError(emailCodeResult.error, "email");
          return;
        }

        setVerificationMode("sign-up");
        setVerificationMessage(
          "You have received an email. Enter the verification code to continue.",
        );
        setVerificationVisible(true);
        return;
      }

      const emailCodeResult = await signIn.emailCode.sendCode({
        emailAddress: emailAddress.trim(),
      });

      if (emailCodeResult.error) {
        showAuthError(emailCodeResult.error, "email");
        return;
      }

      setVerificationMode("sign-in");
      setVerificationMessage(
        "You have received an email. Enter the verification code to continue.",
      );
      setVerificationVisible(true);
    } catch (error) {
      showAuthError(error, isSignUp ? "password" : "email");
    }
  }

  async function handleVerifyCode(code: string) {
    setVerificationError("");
    setIsVerifying(true);

    try {
      const verifyResult =
        verificationMode === "sign-up"
          ? await signUp.verifications.verifyEmailCode({ code })
          : verificationMode === "sign-in-mfa"
            ? await signIn.mfa.verifyEmailCode({ code })
          : await signIn.emailCode.verifyCode({ code });

      if (verifyResult.error) {
        setVerificationError(getAuthErrorMessage(verifyResult.error));
        return false;
      }

      if (
        (verificationMode === "sign-up" && signUp.status === "complete") ||
        (verificationMode === "sign-in" && signIn.status === "complete")
      ) {
        return await finalizeAuth();
      }

      if (verificationMode === "sign-in" && signIn.status === "needs_client_trust") {
        const mfaResult = await signIn.mfa.sendEmailCode();

        if (mfaResult.error) {
          setVerificationError(getAuthErrorMessage(mfaResult.error));
          return false;
        }

        setVerificationMode("sign-in-mfa");
        setVerificationMessage("Enter the new code we sent to your email.");
        return false;
      }

      setVerificationError("Verification incomplete. Please try again.");
      return false;
    } catch (error) {
      setVerificationError(getAuthErrorMessage(error));
      return false;
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleSocialAuth(strategy: SocialStrategy) {
    clearErrors();
    setIsSocialLoading(true);

    try {
      const redirectUrl = Linking.createURL("oauth-callback");
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl,
      });

      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
        router.replace("/");
      }
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
    } finally {
      setIsSocialLoading(false);
    }
  }

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
                value={emailAddress}
                onChangeText={(value) => {
                  setEmailAddress(value);
                  setEmailError("");
                  setFormError("");
                }}
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
            {emailError ? (
              <Text className="-mt-1 px-1 font-poppins-medium text-[12px] leading-[18px] text-[#E5484D]">
                {emailError}
              </Text>
            ) : null}

            {isSignUp ? (
              <>
                <View className="h-[62px] flex-row items-center rounded-[17px] border border-[#E8EAF2] bg-white px-5">
                  <View className="flex-1">
                    <Text className="font-poppins-medium text-[13px] leading-[18px] text-[#8288A1]">
                      Password
                    </Text>
                    <TextInput
                      placeholder="*********"
                      placeholderTextColor="#9AA0B8"
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="newPassword"
                      autoComplete="new-password"
                      secureTextEntry={!passwordVisible}
                      value={password}
                      onChangeText={(value) => {
                        setPassword(value);
                        setPasswordError("");
                        setFormError("");
                      }}
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
                  <TouchableOpacity
                    activeOpacity={0.75}
                    className="h-10 w-10 items-end justify-center"
                    onPress={() => setPasswordVisible((current) => !current)}
                  >
                    <Ionicons
                      name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                      size={23}
                      color="#79809B"
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text className="-mt-1 px-1 font-poppins-medium text-[12px] leading-[18px] text-[#E5484D]">
                    {passwordError}
                  </Text>
                ) : null}
              </>
            ) : null}
          </View>

          {/* Main Action */}
          <TouchableOpacity
            activeOpacity={0.88}
            className={`mt-4 h-[56px] items-center justify-center rounded-[17px] bg-lingua-deep-purple ${
              canSubmit ? "" : "opacity-45"
            }`}
            onPress={handleEmailAuth}
            disabled={!canSubmit}
          >
            <Text className="font-poppins-semibold text-[18px] leading-[25px] text-white">
              {content.action}
            </Text>
          </TouchableOpacity>
          {formError ? (
            <Text className="mt-2 px-1 text-center font-poppins-medium text-[12px] leading-[18px] text-[#E5484D]">
              {formError}
            </Text>
          ) : null}

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
              className={`h-[52px] flex-row items-center rounded-[16px] border border-[#EEF0F5] bg-white px-9 ${
                isLoading ? "opacity-60" : ""
              }`}
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
            >
              <FontAwesome name="google" size={25} color="#4285F4" />
              <Text className="flex-1 text-center font-poppins-medium text-[14px] leading-[20px] text-lingua-text-primary">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.82}
              className={`h-[52px] flex-row items-center rounded-[16px] border border-[#EEF0F5] bg-white px-9 ${
                isLoading ? "opacity-60" : ""
              }`}
              onPress={() => handleSocialAuth("oauth_facebook")}
              disabled={isLoading}
            >
              <FontAwesome name="facebook" size={28} color="#1877F2" />
              <Text className="flex-1 text-center font-poppins-medium text-[14px] leading-[20px] text-lingua-text-primary">
                Continue with Facebook
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.82}
              className={`h-[52px] flex-row items-center rounded-[16px] border border-[#EEF0F5] bg-white px-9 ${
                isLoading ? "opacity-60" : ""
              }`}
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
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

          {/* Clerk Captcha */}
          <View nativeID="clerk-captcha" />
        </View>
      </ScrollView>

      {/* Verification Modal */}
      <VerificationModal
        visible={verificationVisible}
        message={verificationMessage}
        errorMessage={verificationError}
        isLoading={isVerifying}
        onClose={() => setVerificationVisible(false)}
        onVerify={handleVerifyCode}
      />
    </SafeAreaView>
  );
}
