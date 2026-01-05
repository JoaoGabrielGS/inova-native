'use client';

import { Linking, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import useHome from '../../../_hooks/useHome';
import { MyCourseCard } from './_components/course-card';
import { PurchasedCoursesResponse } from '@/src/services/courses/purchased';
import Splash from '@/src/components/splash';
import { Button } from '@/src/components/ui/button';
import { Pagination } from '@/src/components/ui/pagination';
import { Search } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const {
    states: { courses, isLoading, page, search, size, totalElements },
    actions: { setPage, setSearch, handleSearch },
  } = useHome();

  const handleOpenWebsite = () => {
    Linking.openURL('https://www.inovacarreira.com.br/');
  };

  if (isLoading) {
    return <Splash />;
  }

  return (
    <View className="flex-1 bg-brand-grey-10">
      <ScrollView className="flex-1">
        <View className="p-4 pb-0">
          <View className="flex-row items-center gap-2 mb-4 w-full">
            <TextInput
              className="border h-14 px-4 text-white py-2 rounded-lg flex-1 border-white"
              placeholder="Pesquise..."
              placeholderTextColor="#FFFFFF"
              onChangeText={(text) => setSearch(text)}
              value={search}
              autoCapitalize="none"
            />

            <Pressable className='p-4 border border-white rounded-lg' onPress={handleSearch}>
              <Search color="white" size={20} />
            </Pressable>
          </View>
          {courses?.length > 0 ? (
            courses.map((course: PurchasedCoursesResponse) => (
              <MyCourseCard key={course.id} course={course} />
            ))
          ) : (
            <View className="justify-center items-center py-10">
              <Text className="text-center mb-6 text-2xl font-bold text-white">
                Você não possui nenhum curso! Para adquirir nossos cursos, clique no botão abaixo
              </Text>
              <Button text="Comprar Cursos!" onPress={handleOpenWebsite} />
            </View>
          )}
        </View>
      </ScrollView>

      {totalElements > size && (
        <Pagination
          page={page}
          totalElements={totalElements ?? 0}
          size={size}
          onPageChange={setPage}
        />
      )}
    </View>
  );
}