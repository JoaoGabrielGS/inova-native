import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CONTENT_HEIGHT = 80

import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import IMAGE_BACKGROUND from '@/assets/images/bg.png'
import PROFILE_IMAGE from '@/assets/images/profile.png'

interface TabHeaderProps extends BottomTabHeaderProps {}

export function TabHeader({ layout }: TabHeaderProps) {
  const insets = useSafeAreaInsets()
  const totalHeaderHeight = CONTENT_HEIGHT + insets.top

  return (
    <View
      style={{ height: totalHeaderHeight }}
      className="w-full bg-brand-primary-2"
    >
      <ImageBackground
        source={IMAGE_BACKGROUND}
        resizeMode="cover"
        style={{
          height: totalHeaderHeight,
          width: Dimensions.get('window').width
        }}
        className="absolute top-0 left-0"
      >
        <View
          style={{ height: CONTENT_HEIGHT, marginTop: insets.top }}
          className="flex-row items-center justify-between w-full px-6"
        >
          <View className="flex-row items-center -mt-4">
            <Image
              source={PROFILE_IMAGE}
              className="w-12 h-12 rounded-full border-2 border-brand-complementary-1"
            />
            <View className="ml-3">
              <Text className="text-lg font-bold text-brand-complementary-1">
                Filipe Torres
              </Text>
              <Text className="text-sm text-brand-gray-2 -mb-1">
                Paginômetro: 1.527
              </Text>
              <Text className="text-sm text-brand-gray-2">Streak: 16 dias</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
