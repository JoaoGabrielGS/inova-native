import { Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Button } from '@/src/components/ui/button'


export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex flex-1 bg-brand-grey-10 px-6">
      <Text className="text-white">Meus Cursos</Text>
      <Button text='Click me' onPress={() => router.push('/(auth)/login')} />
      {/* <View className="py-10">
        <Text className="text-brand-dark-1 text-base">SEUS RECORDES</Text>

        <View className="flex-row my-1">
          <View className="w-10 h-1 bg-yellow-500 rounded-full"></View>
          <View className="w-10 h-1 bg-gray-300 rounded-full ml-2"></View>
          <View className="w-10 h-1 bg-gray-300 rounded-full ml-2"></View>
        </View>

        <FlatList
          data={RECORD_DATA}
          renderItem={({ item }) => (
            <RecordCard
              title={item.title}
              value={item.value}
              textColor={item.textColor}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <ClubRecordList /> */}
    </View>
  )
}
