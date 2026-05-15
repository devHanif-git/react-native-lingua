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
  errorMessage?: string;
  isLoading?: boolean;
  message?: string;
  onClose: () => void;
  onVerify: (code: string) => Promise<boolean>;
};

export function VerificationModal({
  visible,
  errorMessage = "",
  isLoading = false,
  message = "You have received an email. Enter the verification code to continue.",
  onClose,
  onVerify,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [visible]);

  async function handleCodeChange(value: string) {
    const nextCode = value.replace(/\D/g, "").slice(0, 6);

    setCode(nextCode);

    if (nextCode.length === 6) {
      const didVerify = await onVerify(nextCode);

      if (didVerify) {
        onClose();
      } else {
        setCode("");
        setTimeout(() => inputRef.current?.focus(), 250);
      }
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-[30px] bg-white px-7 pb-8 pt-7">
            {/* Modal Header */}
            <View className="items-center">
              <Text className="font-poppins-bold text-[24px] leading-[32px] text-lingua-text-primary">
                Check your email
              </Text>
              <Text className="mt-2 text-center font-poppins-regular text-[15px] leading-[24px] text-[#6f7590]">
                {message}
              </Text>
            </View>

            {/* Code Input */}
            <TouchableOpacity
              activeOpacity={0.9}
              className="mt-8 flex-row justify-between"
              onPress={() => inputRef.current?.focus()}
            >
              {Array.from({ length: 6 }).map((_, index) => {
                const digit = code[index];

                return (
                  <View
                    key={index}
                    className={`h-[54px] w-[46px] items-center justify-center rounded-2xl border ${
                      digit ? "border-lingua-deep-purple" : "border-[#E8EAF2]"
                    } bg-white`}
                  >
                    <Text className="text-center font-poppins-semibold text-[20px] leading-[24px] text-lingua-text-primary">
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
              editable={!isLoading}
              keyboardType="number-pad"
              maxLength={6}
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              style={{ height: 0, opacity: 0, position: "absolute", width: 0 }}
            />

            {/* Error Message */}
            {errorMessage ? (
              <Text className="mt-3 text-center font-poppins-medium text-[12px] leading-[18px] text-[#E5484D]">
                {errorMessage}
              </Text>
            ) : null}

            {/* Close Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              className={`mt-6 h-14 items-center justify-center rounded-2xl bg-lingua-deep-purple ${
                isLoading ? "opacity-60" : ""
              }`}
              onPress={onClose}
              disabled={isLoading}
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
