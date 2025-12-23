'use client';

import { Linking, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import useHome from '../../../_hooks/useHome';
import { MyCourseCard } from './_components/record-card';
import { PurchasedCoursesResponse } from '@/src/services/courses/purchased';
import Splash from '@/src/components/splash';
import { Button } from '@/src/components/ui/button';

export default function HomeScreen() {
  const router = useRouter();
  const {
    states: { courses, isLoading, page, search, size, totalElements },
    actions: { setPage, setSearch },
  } = useHome();

  const handleOpenWebsite = () => {
    Linking.openURL('https://www.inovacarreira.com.br/');
  };

  if (isLoading) {
    return <Splash />;
  }

  return (
    <ScrollView className="flex-1 bg-brand-grey-10">
      <View className="p-4">
        {courses?.length > 0 ? (
          courses.map((course: PurchasedCoursesResponse) => (
            <MyCourseCard key={course.id} course={course} />
          ))
        ) : (
          <View className="justify-center items-center py-10">
            <Text className='text-center mb-6 text-2xl font-bold text-white'>Você não possui nenhum curso! Para adquirir nossos cursos, clique no botão abaixo</Text>
            <Button text="Comprar Cursos!" onPress={handleOpenWebsite} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}