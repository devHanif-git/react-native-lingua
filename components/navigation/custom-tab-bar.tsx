import Ionicons from "@expo/vector-icons/Ionicons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef } from "react";
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
const tabBarHeight = 76;

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
  const activeScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    activeScale.setValue(0.94);
    Animated.timing(activeScale, {
      duration: 150,
      easing: Easing.out(Easing.quad),
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [activeScale, state.index]);

  return (
    <View
      pointerEvents="box-none"
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 10) }]}
    >
      {/* Tab Bar */}
      <View style={styles.bar}>
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
              <Animated.View
                style={[
                  styles.iconSlot,
                  isFocused ? { transform: [{ scale: activeScale }] } : null,
                ]}
              >
                <Ionicons
                  color={isFocused ? activeColor : inactiveColor}
                  name={tabItem.icon}
                  size={isFocused ? 28 : 26}
                />
              </Animated.View>

              {/* Tab Label */}
              <Text
                numberOfLines={1}
                style={[styles.tabLabel, isFocused ? styles.activeTabLabel : null]}
              >
                {tabItem.label}
              </Text>
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
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    boxShadow: "0 -8px 22px rgba(13, 19, 43, 0.08)",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  bar: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    height: tabBarHeight,
  },
  iconSlot: {
    alignItems: "center",
    height: 31,
    justifyContent: "center",
    width: "100%",
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    gap: 3,
    height: tabBarHeight,
    justifyContent: "flex-start",
    paddingTop: 10,
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
  activeTabLabel: {
    color: activeColor,
  },
});
