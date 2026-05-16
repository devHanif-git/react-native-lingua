import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { lessons } from "@/data/lessons";
import { units } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";
import { useUser } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SlidingGreetingProps = {
  name: string;
};

const defaultLanguage = {
  id: "",
  name: "",
  nativeName: "",
  shortName: "",
  flagCode: "",
  flagUrl: "",
  description: "",
  accentColor: "#FF6B35",
  isAvailable: false,
};

const defaultUnit = {
  id: "",
  languageId: "",
  order: 1,
  title: "",
  description: "",
  level: "beginner",
  lessonIds: [],
};

const defaultLesson = {
  id: "",
  languageId: "",
  unitId: "",
  order: 1,
  title: "",
  description: "",
  level: "beginner",
  kind: "speaking",
  estimatedMinutes: 0,
  xpReward: 0,
  goals: [],
  vocabulary: [],
  phases: [],
  activities: [],
  aiTeacherPrompt: {
    persona: "",
    lessonContext: "",
    teachingInstructions: [],
    correctionStyle: "",
    closingPrompt: "",
  },
};

function SlidingGreeting({ name }: SlidingGreetingProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const greetingText = `Hola, ${name}!`;
  const overflowAmount = Math.max(textWidth - containerWidth, 0);
  const shouldSlide = overflowAmount > 2;

  useEffect(() => {
    translateX.stopAnimation();
    translateX.setValue(0);

    if (!shouldSlide) {
      return;
    }

    const slideAnimation = Animated.loop(
      Animated.sequence([
        Animated.delay(900),
        Animated.timing(translateX, {
          duration: Math.max(overflowAmount * 45, 2200),
          easing: Easing.inOut(Easing.quad),
          toValue: -overflowAmount,
          useNativeDriver: true,
        }),
        Animated.delay(900),
        Animated.timing(translateX, {
          duration: 700,
          easing: Easing.out(Easing.quad),
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    slideAnimation.start();

    return () => {
      slideAnimation.stop();
    };
  }, [overflowAmount, shouldSlide, translateX]);

  return (
    <View className="min-w-0 flex-1 flex-row items-center">
      {/* Greeting Text */}
      <View
        className="min-w-0 flex-1 overflow-hidden"
        onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
      >
        <Animated.Text
          className="font-poppins-semibold text-[16px] leading-[23px] text-lingua-text-primary"
          numberOfLines={1}
          style={[
            styles.greetingText,
            textWidth ? { width: textWidth } : null,
            shouldSlide ? { transform: [{ translateX }] } : null,
          ]}
        >
          {greetingText}
        </Animated.Text>
        <View pointerEvents="none" style={styles.greetingMeasureLayer}>
          <Text
            className="font-poppins-semibold text-[16px] leading-[23px] text-lingua-text-primary"
            numberOfLines={1}
            onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)}
            style={styles.greetingMeasureText}
          >
            {greetingText}
          </Text>
        </View>
      </View>

      {/* Greeting Emoji */}
      <View className="bg-white pl-1.5">
        <Text className="font-poppins-semibold text-[24px] leading-[28px] text-lingua-text-primary">
          {"\uD83D\uDC4B"}
        </Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const { user } = useUser();
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId,
  );
  const selectedLanguage =
    languages.find((language) => language.id === selectedLanguageId) ??
    languages[0] ??
    defaultLanguage;
  const currentUnit =
    units.find((unit) => unit.languageId === selectedLanguage.id) ??
    units[0] ??
    defaultUnit;
  const currentLesson =
    lessons.find((lesson) => lesson.languageId === selectedLanguage.id) ??
    lessons[0] ??
    defaultLesson;
  const primaryEmail = user?.primaryEmailAddress?.emailAddress;
  const firstName =
    user?.firstName ??
    user?.username ??
    primaryEmail?.split("@")[0] ??
    "Learner";
  const todayXp = currentLesson.xpReward + currentLesson.vocabulary.length + 2;
  const dailyXpGoal = todayXp + 5;
  const dailyProgress = `${Math.min(
    (todayXp / dailyXpGoal) * 100,
    100,
  )}%` as `${number}%`;
  const unitLabel = `A1 · Unit ${currentUnit.order}`;
  const wordCount = currentLesson.vocabulary.length;

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-[22px] pb-6 pt-3">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="min-w-0 flex-1 flex-row items-center gap-3 pr-3">
              <View className="h-[38px] w-[38px] overflow-hidden rounded-full bg-[#FFF4EA]">
                <Image
                  source={{ uri: selectedLanguage.flagUrl }}
                  resizeMode="cover"
                  className="h-full w-full"
                />
              </View>
              <SlidingGreeting name={firstName} />
            </View>

            <View className="shrink-0 flex-row items-center gap-5">
              <View className="flex-row items-center gap-2">
                <Image
                  source={images.streakFire}
                  resizeMode="contain"
                  className="h-[34px] w-[34px]"
                />
                <Text className="font-poppins-semibold text-[18px] leading-[25px] text-[#49516B]">
                  12
                </Text>
              </View>
              <View className="absolute bottom-[-24px] right-[-70px] h-[176px] w-[284px]"></View>
              <TouchableOpacity
                activeOpacity={0.72}
                className="h-9 w-8 items-end justify-center"
              >
                <Ionicons
                  name="notifications-outline"
                  size={27}
                  color="#1A1D3A"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Daily Goal */}
          <View
            className="mt-[28px] flex-row items-center justify-between rounded-[18px] bg-[#FFF7EF] px-5 py-4"
            style={styles.softCard}
          >
            <View className="flex-1 pr-4">
              <Text className="font-poppins-semibold text-[15px] leading-[21px] text-[#24304A]">
                Daily goal
              </Text>
              <View className="mt-2 flex-row items-end">
                <Text className="font-poppins-bold text-[28px] leading-[34px] text-lingua-text-primary">
                  {todayXp}
                </Text>
                <Text className="mb-1 ml-2 font-poppins-semibold text-[15px] leading-[21px] text-[#8A90A8]">
                  / {dailyXpGoal} XP
                </Text>
              </View>
              <View className="mt-4 h-[7px] overflow-hidden rounded-full bg-[#FFE0BC]">
                <View
                  className="h-full rounded-full bg-[#FF7A00]"
                  style={{ width: dailyProgress }}
                />
              </View>
            </View>
            <Image
              source={images.treasure}
              resizeMode="contain"
              className="h-[76px] w-[94px]"
            />
          </View>

          {/* Continue Learning */}
          <TouchableOpacity
            activeOpacity={0.88}
            className="mt-[24px] h-[178px] overflow-hidden rounded-[20px] bg-lingua-deep-purple px-5 py-[18px]"
            style={styles.continueCard}
          >
            <View className="relative flex-1">
              <View className="z-10 max-w-[170px]">
                <Text className="font-poppins-semibold text-[15px] leading-[21px] text-white">
                  Continue learning
                </Text>
                <Text className="mt-2 font-poppins-semibold text-[24px] leading-[31px] text-white">
                  {selectedLanguage.name}
                </Text>
                <Text className="mt-0.5 font-poppins-medium text-[16px] leading-[23px] text-[#EEE8FF]">
                  {unitLabel}
                </Text>
              </View>
              <View className="absolute bottom-0 left-0 z-10 h-[42px] w-[112px] items-center justify-center rounded-[12px] bg-white">
                <Text className="font-poppins-semibold text-[14px] leading-[20px] text-lingua-deep-purple">
                  Continue
                </Text>
              </View>
              <View className="absolute bottom-[-65px] right-[-58px] h-[224px] w-[224px]">
                <Image
                  source={images.palace}
                  resizeMode="contain"
                  className="h-full w-full"
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* Today Plan Header */}
          <View className="mt-[27px] flex-row items-center justify-between">
            <Text className="font-poppins-semibold text-[18px] leading-[25px] text-lingua-text-primary">
              Today&apos;s plan
            </Text>
            <TouchableOpacity activeOpacity={0.72}>
              <Text className="font-poppins-semibold text-[15px] leading-[21px] text-lingua-deep-purple">
                View all
              </Text>
            </TouchableOpacity>
          </View>

          {/* Today Plan List */}
          <View className="mt-4 gap-4">
            <View className="flex-row items-center">
              <View className="h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-lingua-deep-purple">
                <Ionicons name="book" size={26} color="#FFFFFF" />
              </View>
              <View className="ml-5 flex-1">
                <Text className="font-poppins-semibold text-[15px] leading-[21px] text-lingua-text-primary">
                  Lesson
                </Text>
                <Text
                  className="mt-0.5 font-poppins-medium text-[13px] leading-[19px] text-[#7B8198]"
                  numberOfLines={1}
                >
                  {currentLesson.title}
                </Text>
              </View>
              <View className="h-[27px] w-[27px] items-center justify-center rounded-full bg-lingua-deep-purple">
                <Ionicons name="checkmark" size={17} color="#FFFFFF" />
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-lingua-deep-purple">
                <Ionicons name="headset" size={26} color="#FFFFFF" />
              </View>
              <View className="ml-5 flex-1">
                <Text className="font-poppins-semibold text-[15px] leading-[21px] text-lingua-text-primary">
                  AI Conversation
                </Text>
                <Text
                  className="mt-0.5 font-poppins-medium text-[13px] leading-[19px] text-[#7B8198]"
                  numberOfLines={1}
                >
                  Practice {selectedLanguage.name.toLowerCase()} speaking
                </Text>
              </View>
              <View className="h-[27px] w-[27px] rounded-full border-2 border-[#8B92AA]" />
            </View>

            <View className="flex-row items-center">
              <View className="h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[#FF4D5B]">
                <Ionicons name="chatbox-ellipses" size={25} color="#FFFFFF" />
              </View>
              <View className="ml-5 flex-1">
                <Text className="font-poppins-semibold text-[15px] leading-[21px] text-lingua-text-primary">
                  New words
                </Text>
                <Text className="mt-0.5 font-poppins-medium text-[13px] leading-[19px] text-[#7B8198]">
                  {wordCount} words
                </Text>
              </View>
              <View className="h-[27px] w-[27px] rounded-full border-2 border-[#8B92AA]" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  continueCard: {
    borderCurve: "continuous",
    boxShadow: "0 12px 24px rgba(91, 59, 246, 0.2)",
  },
  greetingText: {
    flexShrink: 0,
  },
  greetingMeasureText: {
    alignSelf: "flex-start",
    opacity: 0,
  },
  greetingMeasureLayer: {
    left: 0,
    opacity: 0,
    position: "absolute",
    top: 0,
    width: 1000,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  softCard: {
    borderCurve: "continuous",
  },
});
