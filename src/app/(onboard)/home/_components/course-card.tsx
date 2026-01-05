import { Button } from "@/src/components/ui/button";
import { ProgressBar } from "@/src/components/ui/progress";
import { PurchasedCoursesResponse } from "@/src/services/courses/purchased";
import HelpersUtils from "@/src/utils/helpers.utils";
import { Clock3Icon } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import play from "@/assets/icons/play.png";
import receipt from "@/assets/icons/receipt.png";
import { useRouter } from "expo-router";

export interface MyCourseCardProps {
  course: PurchasedCoursesResponse;
}

export function MyCourseCard({ course }: MyCourseCardProps) {
  const router = useRouter();

  return (
    <View
      className="rounded-xl w-full bg-brand-grey-9 p-0 mb-6 overflow-hidden"
      style={styles.card}
    >
      <View className="w-full">
        <Image
          source={{ uri: course.bannerUrl }}
          className="w-full h-48 rounded-t-xl"
          resizeMode="cover"
        />
      </View>

      <View className="px-3 pb-4">
        <View className="flex-row mb-2 mt-3 items-start gap-4 justify-between">
          <View
            style={styles.badge}
            className="bg-brand-grey-10 px-2 rounded-full overflow-hidden uppercase"
          >
            <Text className="text-white font-semibold">{course.type.name}</Text>
          </View>

          <View className="flex-row items-center gap-4">
            <Text className="text-white text-lg">
              {HelpersUtils.formatDurationHHMM(course.durationInMinutes)}hs
            </Text>
            <Clock3Icon color="white" />
          </View>
        </View>

        <Text className="text-white font-bold text-xl">{course.title}</Text>

        <View className="flex-row items-center gap-2 mt-2">
          <ProgressBar progress={course.progress.progressPercentage} />
          <Text className="text-white">
            {Math.round(course.progress.progressPercentage)}%
          </Text>
        </View>

        <View className="mt-6 gap-3">
          <Button
            text="Assistir Aulas"
            icon={play}
            onPress={() => router.push(`/(onboard)/course/consumption`)}
          />
          <Button text="Ver Detalhes" variant="outline" icon={receipt} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
  },
  card: {
    maxHeight: 700,
  },
});
