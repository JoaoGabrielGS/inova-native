import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { TabHeader } from "@/src/components/header";
import { HomeIcon } from "@/src/components/icons/home";
import { ProfileIcon } from "@/src/components/icons/profile";

export default function OnboardLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarActiveTintColor: "#FFFFFF",
        headerShown: true,
        headerStyle: {
          width: 120,
        },
        header: (props: BottomTabHeaderProps) => <TabHeader {...props} />,
        tabBarStyle: {
          display: "flex",
          height: 90,
          borderTopWidth: 0,
          backgroundColor: "#212121",
          ...Platform.select({
            ios: {
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: -1,
              },
              shadowOpacity: 0.08,
              shadowRadius: 2,
            },
            android: {
              elevation: 4,
            },
          }),
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 15,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon size={28} color={color} isFill={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Conta",
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon size={28} color={color} isFill={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
