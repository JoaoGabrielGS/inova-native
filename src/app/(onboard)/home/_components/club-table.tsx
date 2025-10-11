import { ChevronRight } from 'lucide-react-native'
import { FlatList, Text, View } from 'react-native'

interface ClubRecord {
  id: string
  name: string
  reads: number
  ranking: string
}

const DUMMY_CLUB_DATA: ClubRecord[] = [
  { id: '1', name: 'Leitores Dedicados', reads: 35, ranking: '1º' },
  { id: '2', name: 'Café, Sofá e Leitura', reads: 7, ranking: '2º' },
  { id: '3', name: 'Sem Controle', reads: 4, ranking: '5º' },
  { id: '4', name: 'O Clube das Orelhas', reads: 1, ranking: '14º' }
]

interface HeaderItemProps {
  title: string
  className?: string
}

const HeaderItem = ({ title, className }: HeaderItemProps) => (
  <View className={`flex-1 ${className}`}>
    <Text className="font-semibold text-gray-500 text-sm">{title}</Text>
  </View>
)

const ClubRow = ({
  name,
  reads,
  ranking,
  isLast
}: ClubRecord & { isLast: boolean }) => (
  <View
    className={`flex-row items-center py-4 ${isLast ? '' : 'border-b border-dashed border-gray-200'}`}
  >
    <View className="flex-[2]">
      <Text className="text-gray-800 font-medium">{name}</Text>
    </View>
    <View className="flex-1 items-center">
      <Text className="text-gray-800">{reads}</Text>
    </View>
    <View className="flex-1 items-center">
      <Text className="text-brand-primary-2 font-bold">{ranking}</Text>
    </View>
  </View>
)

export function ClubRecordList() {
  const renderItem = ({ item, index }: { item: ClubRecord; index: number }) => (
    <ClubRow {...item} isLast={index === DUMMY_CLUB_DATA.length - 1} />
  )

  return (
    <View>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-brand-primary-2">CLUBES</Text>
        <View className="flex-row items-center">
          <Text className="text-brand-secondary-1 font-medium">Ver todos</Text>
          <ChevronRight size={16} color="#00B7E0" />
        </View>
      </View>

      <View className="bg-brand-light-n1 rounded-xl border border-gray-100 p-4">
        <View className="flex-row items-center pb-3 border-b border-gray-200 mb-2">
          <HeaderItem title="Nome" className="flex-[2]" />
          <HeaderItem title="Leituras" className="flex-1 items-center" />
          <HeaderItem title="Ranking" className="flex-1 items-center" />
        </View>

        <FlatList
          data={DUMMY_CLUB_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </View>
  )
}
