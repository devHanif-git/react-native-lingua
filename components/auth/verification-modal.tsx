import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type VerificationModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function VerificationModal({
  visible,
  onClose,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [visible]);

  function handleCodeChange(value: string) {
    const nextCode = value.replace(/\D/g, "").slice(0, 6);

    setCode(nextCode);

    if (nextCode.length === 6) {
      onClose();
      router.replace("/");
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-[28px] bg-white px-6 pb-7 pt-6">
            {/* Modal Header */}
            <View className="items-center">
              <Text className="font-poppins-bold text-[24px] leading-[32px] text-lingua-text-primary">
                Check your email
              </Text>
              <Text className="mt-2 text-center font-poppins-regular text-[15px] leading-[24px] text-[#6f7590]">
                You have received an email. Enter the verification code to
                continue.
              </Text>
            </View>

            {/* Code Input */}
            <TouchableOpacity
              activeOpacity={0.9}
              className="mt-7 flex-row justify-between"
              onPress={() => inputRef.current?.focus()}
            >
              {Array.from({ length: 6 }).map((_, index) => {
                const digit = code[index];

                return (
                  <View
                    key={index}
                    className={`h-12 w-11 items-center justify-center rounded-2xl border ${
                      digit ? "border-lingua-deep-purple" : "border-[#E8EAF2]"
                    } bg-white`}
                  >
                    <Text className="font-poppins-semibold text-[20px] leading-[28px] text-lingua-text-primary">
                      {digit}
                    </Text>
                  </View>
                );
              })}
            </TouchableOpacity>

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleCodeChange}
              keyboardType="number-pad"
              maxLength={6}
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              style={{ height: 0, opacity: 0, position: "absolute", width: 0 }}
            />

            {/* Close Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              className="mt-6 h-14 items-center justify-center rounded-2xl bg-lingua-deep-purple"
              onPress={onClose}
            >
              <Text className="font-poppins-semibold text-[17px] leading-[24px] text-white">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
