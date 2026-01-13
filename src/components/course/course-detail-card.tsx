import { Button } from "@/src/components/ui/button";
import { ProgressBar } from "@/src/components/ui/progress";
import HelpersUtils from "@/src/utils/helpers.utils";
import { Clock3Icon } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import play from "@/assets/icons/play.png";
import { useRouter } from "expo-router";
import { ListCourseDetailsByIdReponse } from "@/src/services/courses/get_by_id";

export interface CurseDetailCardProps {
  courseDetail: ListCourseDetailsByIdReponse;
}

export function CourseDetailCard({ courseDetail }: CurseDetailCardProps) {
  const router = useRouter();

  return (
    <View
      className="rounded-xl w-full bg-brand-grey-9 p-0 mb-6 overflow-hidden"
      style={styles.card}
    >
      <View className="w-full">
        <Image
          source={{ uri: courseDetail.course?.bannerUrl }}
          className="w-full h-64 rounded-t-xl"
          resizeMode="cover"
        />
      </View>

      <View className="px-3 pb-4">
        <View className="flex-row mb-2 mt-3 items-start gap-4 justify-between">
          <View
            style={styles.badge}
            className="bg-brand-grey-10 px-2 rounded-full overflow-hidden uppercase"
          >
            <Text className="text-white font-semibold">
              {courseDetail.course?.type?.name}
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <Text className="text-white text-lg">
              {HelpersUtils.formatDurationHHMM(courseDetail.course?.workload)}hs
            </Text>
            <Clock3Icon color="white" />
          </View>
        </View>

        <Text className="text-white font-bold text-xl">
          {courseDetail.course?.title}
        </Text>

        <View className="flex-row items-center gap-2 mt-2">
          <>
            <ProgressBar
              progress={courseDetail.enrollment!.progress as number}
            />
            <Text className="text-white">
              {Math.round(courseDetail.enrollment?.progress ?? 0)}%
            </Text>
          </>
        </View>

        <View>
          <View className="mt-4">
            <Text className="text-sm font-bold text-white">
              Valor pago:{" "}
              {HelpersUtils.formatCurrency(courseDetail.order?.paidPrice)}
            </Text>
          </View>

          <View className="mt-1">
            <Text className="text-sm font-bold text-white">
              Data de compra:{" "}
              {HelpersUtils.formatDateOutput(courseDetail.enrollment?.since)}
            </Text>
          </View>

          <View className="mt-1">
            <Text className="text-sm font-bold text-white">
              Método de Pagamento: {courseDetail.order?.paymentMethod}
            </Text>
          </View>
        </View>

        <View className="mt-6 gap-3">
          <Button
            text="Assistir Aulas"
            icon={play}
            onPress={() =>
              router.push({
                pathname: "/(onboard)/course/[id]",
                params: { id: courseDetail.course?.id ?? 0 },
              })
            }
          />
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
