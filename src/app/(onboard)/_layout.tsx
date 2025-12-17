import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { TabHeader } from "@/src/components/header";
import { BookshelfIcon } from "@/src/components/icons/bookshelf";
import { CommunitiesIcon } from "@/src/components/icons/communities";
import { HomeIcon } from "@/src/components/icons/home";
import { ProfileIcon } from "@/src/components/icons/profile";
import { ReadingIcon } from "@/src/components/icons/reading";

export default function OnboardLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#0E47B3",
        tabBarActiveTintColor: "#0E47B3",
        headerShown: true,
        headerStyle: {
          width: 120,
        },
        // header: (props: BottomTabHeaderProps) => <TabHeader {...props} />,
        tabBarStyle: {
          display: "flex",
          height: Platform.OS === "ios" ? 90 : 60,
          backgroundColor: "white",
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
        name="communities/index"
        options={{
          title: "Clubes",
          tabBarIcon: ({ color, focused }) => (
            <CommunitiesIcon size={28} color={color} isFill={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="reading/index"
        options={{
          title: "Leitura",
          tabBarIcon: ({ color, focused }) => (
            <ReadingIcon size={28} color={color} isFill={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookshelf/index"
        options={{
          title: "Estante",
          tabBarIcon: ({ color, focused }) => (
            <BookshelfIcon size={28} color={color} isFill={focused} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="profile/index"
        options={{
          title: "Conta",
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon size={28} color={color} isFill={focused} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
