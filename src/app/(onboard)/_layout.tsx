import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { TabHeader } from "@/src/components/header";
import { ProfileIcon } from "@/src/components/icons/profile";
import { BookshelfIcon } from "@/src/components/icons/bookshelf";

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
          title: "Cursos",
          tabBarIcon: ({ color, focused }) => (
            <BookshelfIcon size={28} color={color} isFill={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="course/[id]/index"
        options={{
          href: null,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="course/[id]/consumption/[enrollmentId]/index"
        options={{
          href: null,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="course/[id]/consumption/[enrollmentId]/prova/resumo/index"
        options={{
          href: null,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="course/[id]/consumption/[enrollmentId]/prova/index"
        options={{
          href: null,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Conta",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon size={28} color={color} isFill={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
