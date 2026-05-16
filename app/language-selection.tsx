import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/language-store";
import type { LanguageId } from "@/types/learning";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const learnerCounts: Record<LanguageId, string> = {
  spanish: "28.4M learners",
  french: "19.4M learners",
  japanese: "12.7M learners",
};

export default function LanguageSelectionScreen() {
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId,
  );
  const setSelectedLanguageId = useLanguageStore(
    (state) => state.setSelectedLanguageId,
  );
  const [searchText, setSearchText] = useState("");
  const [draftLanguageId, setDraftLanguageId] =
    useState<LanguageId>(selectedLanguageId);

  const filteredLanguages = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    if (!normalizedSearch) {
      return languages;
    }

    return languages.filter((language) => {
      const searchableText =
        `${language.name} ${language.nativeName} ${language.shortName}`.toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [searchText]);

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  };

  const handleConfirmPress = () => {
    setSelectedLanguageId(draftLanguageId);
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-[22px] pb-0 pt-1">
          {/* Header */}
          <View className="h-11 flex-row items-center justify-center">
            <TouchableOpacity
              activeOpacity={0.72}
              className="absolute left-0 h-10 w-10 items-start justify-center"
              onPress={handleBackPress}
            >
              <Ionicons name="chevron-back" size={26} color="#0D132B" />
            </TouchableOpacity>
            <Text className="font-poppins-semibold text-[18px] leading-[25px] text-lingua-text-primary">
              Choose a language
            </Text>
          </View>

          {/* Search Bar */}
          <View className="mt-3 h-[52px] flex-row items-center gap-3 rounded-[26px] border border-[#E8EAF1] bg-[#FAFAFD] px-4">
            <Ionicons name="search-outline" size={22} color="#596179" />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              className="body-sm flex-1 text-[13px] text-lingua-text-primary"
              onChangeText={setSearchText}
              placeholder="Search languages"
              placeholderTextColor="#777D96"
              returnKeyType="search"
              underlineColorAndroid="transparent"
              value={searchText}
            />
          </View>

          {/* Popular Languages */}
          <View className="mt-6">
            <Text className="font-poppins-semibold text-[16px] leading-[22px] text-lingua-text-primary">
              Popular
            </Text>

            <View className="mt-4 gap-3">
              {filteredLanguages.map((language) => {
                const isSelected = language.id === draftLanguageId;

                return (
                  <TouchableOpacity
                    activeOpacity={0.86}
                    className="min-h-[84px] flex-row items-center rounded-[20px] border bg-white px-4"
                    key={language.id}
                    onPress={() => setDraftLanguageId(language.id)}
                    style={[
                      styles.languageCard,
                      isSelected
                        ? styles.selectedLanguageCard
                        : styles.defaultLanguageCard,
                    ]}
                  >
                    {/* Language Flag */}
                    <View className="h-[38px] w-[38px] overflow-hidden rounded-full bg-[#F6F7FB]">
                      <Image
                        source={{ uri: language.flagUrl }}
                        resizeMode="cover"
                        className="h-full w-full"
                      />
                    </View>

                    {/* Language Details */}
                    <View className="ml-4 flex-1">
                      <Text className="font-poppins-semibold text-[15px] leading-[21px] text-lingua-text-primary">
                        {language.name}
                      </Text>
                      <Text className="mt-0.5 font-poppins text-[12px] leading-[17px] text-[#777D96]">
                        {learnerCounts[language.id]}
                      </Text>
                    </View>

                    {/* Selection Indicator */}
                    <View
                      className={
                        isSelected
                          ? "h-8 w-8 items-center justify-center rounded-full bg-lingua-deep-purple"
                          : "h-8 w-8 items-center justify-center"
                      }
                    >
                      <Ionicons
                        name={isSelected ? "checkmark" : "chevron-forward"}
                        size={isSelected ? 20 : 23}
                        color={isSelected ? "#FFFFFF" : "#596179"}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Empty Search State */}
            {filteredLanguages.length === 0 ? (
              <Text className="body-md mt-8 text-center">
                No languages found.
              </Text>
            ) : null}
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            className="mt-4 h-[58px] flex-row items-center justify-center gap-3 rounded-[18px] bg-lingua-deep-purple px-6"
            onPress={handleConfirmPress}
            style={styles.confirmButton}
          >
            <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            <Text className="font-poppins-semibold text-[15px] leading-[21px] text-white">
              Confirm language
            </Text>
          </TouchableOpacity>

          {/* Earth Illustration */}
          <View className="mt-auto h-[190px] w-[122%] self-center overflow-hidden">
            <Image
              source={images.earth}
              resizeMode="contain"
              className="absolute bottom-[-135px] h-[385px] w-full"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  languageCard: {
    borderCurve: "continuous",
  },
  defaultLanguageCard: {
    borderColor: "#F1F2F6",
    boxShadow: "0 8px 18px rgba(13, 19, 43, 0.03)",
  },
  selectedLanguageCard: {
    backgroundColor: "#FAF9FF",
    borderColor: "#8B68FF",
    borderWidth: 2,
    boxShadow: "0 10px 22px rgba(108, 78, 245, 0.12)",
  },
  confirmButton: {
    borderCurve: "continuous",
    boxShadow: "0 10px 18px rgba(91, 59, 246, 0.2)",
  },
});
