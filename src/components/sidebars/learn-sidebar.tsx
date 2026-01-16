import { Text, View } from "react-native";
import {
  Module,
  ModuleContent,
  ModuleItem,
  ModuleTrigger,
} from "../accordions/module";
import { CheckCircle2, ClipboardCheck, Edit3 } from "lucide-react-native";
import {
  Discipline,
  DisciplineContent,
  DisciplineItem,
  DisciplineTrigger,
} from "../accordions/discipline";
import { ClassGrid, ClassItem } from "../grids/class-grid";
import {
  selectedLessonAtom,
  useLearnSidebar,
} from "@/src/_hooks/useLearnSidebar";
import {
  CourseConsumptionCourse,
  CourseConsumptionDiscipline,
  CourseConsumptionLesson,
  CourseConsumptionModule,
  CourseConsumptionResponse,
} from "@/src/services/courses/consumption";
import { useAtom } from "jotai";
import ConfirmInitExamDialog from "../modals/confirmInitExam";
import { Button } from "../ui/button";
import { router } from "expo-router";
import HelpersUtils from "@/src/utils/helpers.utils";

interface LearnSidebarProps {
  enrollment: CourseConsumptionResponse;
  show: boolean;
}

const LearnSidebar = ({ enrollment, show }: LearnSidebarProps) => {
  const {
    states: {
      course,
      isModuleEvaluation,
      isDisciplineEvaluation,
      dropdownOpen,
      isOpen,
      posModalOpen,
      openModuleId,
      openDisciplineId,
    },
    actions: {
      setDropdownOpen,
      setIsOpen,
      setSelectedDiscipline,
      handleSelectLesson,
      verifyAttempts,
      professionalModalAttemptOpen,
      setOpenDisciplineId,
      setOpenModuleId,
    },
  } = useLearnSidebar(enrollment, show, enrollment.id);

  const [selectedClass] = useAtom<CourseConsumptionLesson | null>(
    selectedLessonAtom,
  );

  const allDisiciplinesWatched =
    course?.modules.every((module) =>
      module.disciplines.every((disc) =>
        disc.lessons.every((less) => less.watched),
      ),
    ) ?? false;

  interface EvaluationButtonProps {
    isCertificateble: boolean;
    course: CourseConsumptionCourse;
    isLoading?: boolean;
    discipline?: CourseConsumptionDiscipline;
    module?: CourseConsumptionModule;
  }

  const EvaluationButton = ({
    isLoading = false,
    ...props
  }: EvaluationButtonProps) => {
    const handleEvaluationClick = ({
      course,
      discipline,
      module,
      isCertificateble,
    }: EvaluationButtonProps) => {
      if (course?.type?.id === 1 || course?.type?.id === 4) {
        if (isCertificateble) {
          router.push(
            `/course/[id]/consumption/prova/resumo?module=${module?.id}`,
          );
          return;
        }
        setDropdownOpen(true);
        return;
      }

      if (course?.type?.id === 2) {
        if (isCertificateble) {
          router.push(
            `/course/[id]/consumption/prova/resumo?discipline=${discipline?.id}`,
          );
          return;
        }
        professionalModalAttemptOpen(discipline as CourseConsumptionDiscipline);
        return;
      }
      verifyAttempts(discipline as CourseConsumptionDiscipline);
    };

    return (
      <>
        <Button
          onPress={() => handleEvaluationClick(props)}
          variant={props.isCertificateble ? "success" : "outline"}
          text={
            props.isCertificateble
              ? "Aprovado - Visualizar Avaliação"
              : "Atividade"
          }
          icon={
            props.isCertificateble ? (
              <ClipboardCheck size={20} />
            ) : (
              <Edit3 size={20} />
            )
          }
          className="w-full"
        />
      </>
    );
  };

  return (
    <View className="w-full gap-4 px-4">
      <View>
        <Module value={openModuleId} onValueChange={setOpenModuleId}>
          {course.modules?.map((module, moduleIndex) => {
            const allDisciplinesCompleted = module.disciplines.every(
              (discipline) =>
                discipline.lessons.every((lesson) => lesson.watched),
            );
            return (
              <ModuleItem value={module.id.toString()} key={module.id}>
                <ModuleTrigger value={module.id.toString()}>
                  {isDisciplineEvaluation ? (
                    <View className="flex-row w-full items-center gap-2">
                      <Text className="flex-1 text-left text-white">
                        <Text className="font-bold">0{moduleIndex + 1}:</Text>{" "}
                        {module.name}
                      </Text>
                      {allDisciplinesCompleted && (
                        <CheckCircle2 size={16} color="#10b981" />
                      )}
                    </View>
                  ) : (
                    <View className="flex-row w-full gap-2">
                      <Text className="flex-1 text-start text-white">
                        <Text className="font-bold">0{moduleIndex + 1}:</Text>
                        {" Módulo " + (moduleIndex + 1)}
                      </Text>
                    </View>
                  )}
                </ModuleTrigger>
                <ModuleContent value={module.id.toString()}>
                  <Discipline
                    value={openDisciplineId}
                    onValueChange={setOpenDisciplineId}
                  >
                    {module.disciplines.map((discipline, disciplineIndex) => {
                      const allLessonsWatched = discipline.lessons.every(
                        (lesson) => lesson.watched,
                      );

                      return (
                        <View key={discipline.id} className="mb-2">
                          <DisciplineItem value={discipline.id.toString()}>
                            <DisciplineTrigger
                              value={discipline.id.toString()}
                              index={disciplineIndex + 1}
                              unavailable={!discipline.liberated}
                              allLessonsWatched={allLessonsWatched}
                            >
                              <Text>{discipline.name}</Text>
                            </DisciplineTrigger>

                            <DisciplineContent value={discipline.id.toString()}>
                              <ClassGrid>
                                {discipline.lessons.map(
                                  (lesson, lessonIndex) => (
                                    <ClassItem
                                      key={lesson.id}
                                      completed={lesson.watched}
                                      actived={selectedClass?.id === lesson.id}
                                      onPress={() => {
                                        handleSelectLesson({
                                          lesson,
                                          discipline,
                                          indexs: {
                                            moduleIndex,
                                            disciplineIndex,
                                            lessonIndex,
                                          },
                                        });
                                        setSelectedDiscipline(discipline);
                                      }}
                                    >
                                      {lesson?.title}
                                    </ClassItem>
                                  ),
                                )}
                                {isDisciplineEvaluation &&
                                  allLessonsWatched && (
                                    <EvaluationButton
                                      isCertificateble={discipline.isApproved}
                                      course={course}
                                      discipline={discipline}
                                      module={module}
                                    />
                                  )}
                              </ClassGrid>
                            </DisciplineContent>
                          </DisciplineItem>

                          {!discipline.liberated && (
                            <View className="mt-1 flex-row justify-center bg-red-500/10 p-2 rounded">
                              <Text className="font-sans text-xs font-bold text-red-500 text-center">
                                Disciplina liberada dia{" "}
                                {HelpersUtils.formatDateOutput(
                                  discipline.liberationDate,
                                )}
                              </Text>
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </Discipline>
                </ModuleContent>
              </ModuleItem>
            );
          })}
        </Module>

        <View className="mt-4 gap-4">
          <>
            {isModuleEvaluation &&
              course.modules?.[0]?.hasExam === true &&
              allDisiciplinesWatched && (
                <EvaluationButton
                  course={course}
                  isCertificateble={course.modules?.[0].isApproved}
                  module={course?.modules?.[0]}
                />
              )}
          </>
        </View>
      </View>
      <ConfirmInitExamDialog
        isOpen={dropdownOpen}
        onOpenChange={setDropdownOpen}
        module={course.modules[0]}
        enrollmentId={enrollment.id}
      />
    </View>
  );
};

export default LearnSidebar;
