import Ionicons from "@expo/vector-icons/Ionicons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const activeColor = "#6C4EF5";
const inactiveColor = "#7B8198";
const tabBarHeight = 82;
const tabCircleSize = 54;

const tabItems: Record<
  string,
  {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
  }
> = {
  index: {
    icon: "home",
    label: "Home",
  },
  learn: {
    icon: "book-outline",
    label: "Learn",
  },
  "ai-teacher": {
    icon: "sparkles-outline",
    label: "AI Teacher",
  },
  chat: {
    icon: "chatbubble-outline",
    label: "Chat",
  },
  profile: {
    icon: "person-outline",
    label: "Profile",
  },
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const activePosition = useRef(new Animated.Value(0)).current;
  const tabWidth = barWidth / state.routes.length;

  useEffect(() => {
    if (!tabWidth) {
      return;
    }

    Animated.timing(activePosition, {
      duration: 140,
      easing: Easing.out(Easing.quad),
      toValue: state.index * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [activePosition, state.index, tabWidth]);

  return (
    <View
      pointerEvents="box-none"
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 14) }]}
    >
      {/* Tab Bar */}
      <View
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
        style={styles.bar}
      >
        {/* Active Circle */}
        {tabWidth ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activeCircle,
              {
                left: tabWidth / 2 - tabCircleSize / 2,
                transform: [{ translateX: activePosition }],
              },
            ]}
          />
        ) : null}

        {/* Tab Buttons */}
        {state.routes.map((route, index) => {
          const options = descriptors[route.key].options;
          const tabItem = tabItems[route.name];
          const isFocused = state.index === index;

          if (!tabItem) {
            return null;
          }

          const handlePress = () => {
            const event = navigation.emit({
              canPreventDefault: true,
              target: route.key,
              type: "tabPress",
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const handleLongPress = () => {
            navigation.emit({
              target: route.key,
              type: "tabLongPress",
            });
          };

          return (
            <TouchableOpacity
              accessibilityLabel={options.tabBarAccessibilityLabel}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              activeOpacity={0.82}
              key={route.key}
              onLongPress={handleLongPress}
              onPress={handlePress}
              style={styles.tabButton}
            >
              {/* Tab Icon */}
              <View style={isFocused ? styles.activeIconSlot : styles.iconSlot}>
                <Ionicons
                  color={isFocused ? "#FFFFFF" : inactiveColor}
                  name={tabItem.icon}
                  size={isFocused ? 25 : 24}
                />
              </View>

              {/* Tab Label */}
              {!isFocused ? (
                <Text numberOfLines={1} style={styles.tabLabel}>
                  {tabItem.label}
                </Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  bar: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderCurve: "continuous",
    borderRadius: 28,
    boxShadow: "0 -8px 24px rgba(13, 19, 43, 0.08)",
    flexDirection: "row",
    height: tabBarHeight,
    overflow: "hidden",
    position: "relative",
  },
  activeCircle: {
    alignItems: "center",
    backgroundColor: activeColor,
    borderRadius: tabCircleSize / 2,
    height: tabCircleSize,
    justifyContent: "center",
    position: "absolute",
    top: (tabBarHeight - tabCircleSize) / 2,
    width: tabCircleSize,
  },
  activeIconSlot: {
    alignItems: "center",
    height: tabCircleSize,
    justifyContent: "center",
    width: "100%",
  },
  iconSlot: {
    alignItems: "center",
    height: 32,
    justifyContent: "center",
    width: "100%",
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    gap: 2,
    height: tabBarHeight,
    justifyContent: "center",
    zIndex: 1,
  },
  tabLabel: {
    color: inactiveColor,
    fontFamily: "Poppins-SemiBold",
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    width: "100%",
  },
});
