import { Image, ImageSourcePropType, Text, View } from 'react-native'

export interface RecordCardProps {
  title: string
  value: string
  textColor: string
  image: ImageSourcePropType
}

export function RecordCard({
  title,
  value,
  textColor,
  image
}: RecordCardProps) {
  return (
    <View className="w-56 h-56 bg-brand-light-n1 pr-0 pt-0 p-4 rounded-xl ml-0 m-2">
      <View className={`w-full h-3/4  rounded-t-xl opacity-90`}>
        <View className="w-full h-full justify-start items-end">
          <Image source={image} className="w-40 h-40" />
        </View>
      </View>
      <View className="h-1/4 justify-between">
        <Text className="text-brand-dark-gray-1">{title}</Text>
        <Text className={`text-xl font-bold ${textColor}`}>{value}</Text>
      </View>
    </View>
  )
}
