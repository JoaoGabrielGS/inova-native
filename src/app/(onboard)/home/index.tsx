import { FlatList, Text, View } from 'react-native'
import BookCardImage from '@/assets/icons/book.png'
import BookCardImage2 from '@/assets/icons/book-2.png'
import { ClubRecordList } from './_components/club-table'
import { RecordCard, RecordCardProps } from './_components/record-card'

interface RecordData extends RecordCardProps {
  id: string
}

const RECORD_DATA: RecordData[] = [
  {
    id: '1',
    title: 'Paginômetro',
    value: '15.358',
    textColor: 'text-brand-primary-1',
    image: BookCardImage
  },
  {
    id: '2',
    title: 'Livros',
    value: '18',
    textColor: 'text-blue-400',
    image: BookCardImage2
  }
]

export default function HomeScreen() {
  return (
    <View className="flex flex-1 bg-brand-grey-10 px-6">
      <Text className="text-white">Meus Cursos</Text>
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
