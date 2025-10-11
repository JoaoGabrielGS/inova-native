import { Tabs } from 'expo-router'
import { BookshelfIcon } from '@/src/components/icons/bookshelf'
import { CommunitiesIcon } from '@/src/components/icons/communities'
import { HomeIcon } from '@/src/components/icons/home'
import { ProfileIcon } from '@/src/components/icons/profile'
import { ReadingIcon } from '@/src/components/icons/reading'

export default function OnboardLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: '#0E47B3',
        tabBarActiveTintColor: '#0E47B3',
        tabBarStyle: {
          height: 100,
          display: 'flex'
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 15
        }
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon size={28} color={color} isFill={focused} />
          )
        }}
      />
      <Tabs.Screen
        name="communities/index"
        options={{
          title: 'Clubes',
          tabBarIcon: ({ color, focused }) => (
            <CommunitiesIcon size={28} color={color} isFill={focused} />
          )
        }}
      />
      <Tabs.Screen
        name="reading/index"
        options={{
          title: 'Leitura',
          tabBarIcon: ({ color, focused }) => (
            <ReadingIcon size={28} color={color} isFill={focused} />
          )
        }}
      />
      <Tabs.Screen
        name="bookshelf/index"
        options={{
          title: 'Estante',
          tabBarIcon: ({ color, focused }) => (
            <BookshelfIcon size={28} color={color} isFill={focused} />
          )
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Conta',
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon size={28} color={color} isFill={focused} />
          )
        }}
      />
    </Tabs>
  )
}
