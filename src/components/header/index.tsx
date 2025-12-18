import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CONTENT_HEIGHT = 80

import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import PROFILE_IMAGE from '@/assets/images/profile.png'
import inova from '@/assets/icons/inova.png'

interface TabHeaderProps extends BottomTabHeaderProps { }

export function TabHeader({ layout }: TabHeaderProps) {
  const insets = useSafeAreaInsets()
  const totalHeaderHeight = CONTENT_HEIGHT + insets.top

  return (
    <View
      style={{ height: totalHeaderHeight }}
      className="w-full bg-brand-primary-10"
    >
      <View
        style={{ height: CONTENT_HEIGHT, marginTop: insets.top }}
        className="flex-row items-center justify-between w-full px-6"
      >
        <View className="flex-row items-center">
          <View className="flex-1 flex-row items-center">
            <Image
              source={PROFILE_IMAGE}
              className="w-16 h-16 rounded-full border-2 border-white"
            />
            <View className="ml-3">
              <Text className="text-xl font-bold text-white">
                Filipe Torres
              </Text>
            </View>
          </View>
          <Image
            source={inova}
            className="w-8 h-8 "
          />
        </View>
      </View>
    </View>
  )
}
