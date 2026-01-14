// import { Text, View } from "react-native";
// import {
//   Module,
//   ModuleContent,
//   ModuleItem,
//   ModuleTrigger,
// } from "../accordions/module";
// import { CheckCircle2 } from "lucide-react-native";
// import {
//   Discipline,
//   DisciplineContent,
//   DisciplineItem,
//   DisciplineTrigger,
// } from "../accordions/discipline";
// import { ClassGrid, ClassItem } from "../grids/class-grid";
// import {
//   selectedLessonAtom,
//   useLearnSidebar,
// } from "@/src/_hooks/useLearnSidebar";
// import { CourseConsumptionLesson } from "@/src/services/courses/consumption";
// import { useAtom } from "jotai";

// const LearnSidebar = () => {
//   const {
//     states: {
//       course,
//       isLoadingAgreementTerms,
//       canGenerate,
//       isLoadingCanGenerate,
//       isModuleEvaluation,
//       isDisciplineEvaluation,
//       dropdownOpen,
//       isOpen,
//       posModalOpen,
//       professionalModalOpen,
//       disciplineAttempt,
//       openModuleId,
//       openDisciplineId,
//     },
//     actions: {
//       setDropdownOpen,
//       setIsOpen,
//       setSelectedDiscipline,
//       handleSelectLesson,
//       verifyAttempts,
//       professionalModalAttemptOpen,
//       generateCertificate,
//       setPosModalOpen,
//       setProfessionalModalOpen,
//       setOpenDisciplineId,
//       setOpenModuleId,
//     },
//   } = useLearnSidebar(enrollment, show, enrollment.id);

//   const [selectedClass] = useAtom<CourseConsumptionLesson | null>(
//     selectedLessonAtom,
//   );

//   return (
//     <View className="w-full gap-4 px-4">
//       <View>
//         <Text className="mb-2 font-bold text-gray-400">Conteúdo do Curso</Text>

//         <Module value={openModuleId} onValueChange={setOpenModuleId}>
//           {course.modules?.map((module, moduleIndex) => {
//             const allDisciplinesCompleted = module.disciplines.every(
//               (discipline) =>
//                 discipline.lessons.every((lesson) => lesson.watched),
//             );
//             return (
//               <ModuleItem value={module.id.toString()} key={module.id}>
//                 <ModuleTrigger value={module.id.toString()}>
//                   {isDisciplineEvaluation ? (
//                     <View className="flex-row w-full items-center gap-2">
//                       <Text className="flex-1 text-left text-white">
//                         <Text className="font-bold">0{moduleIndex + 1}:</Text>{" "}
//                         {module.name}
//                       </Text>
//                       {allDisciplinesCompleted && (
//                         <CheckCircle2 size={16} color="#10b981" />
//                       )}
//                     </View>
//                   ) : (
//                     <View className="flex-row w-full gap-2">
//                       <Text className="flex-1 text-start text-white">
//                         <Text className="font-bold">0{moduleIndex + 1}:</Text>
//                         {" Módulo " + (moduleIndex + 1)}
//                       </Text>
//                     </View>
//                   )}
//                 </ModuleTrigger>
//                 <ModuleContent value={module.id.toString()}>
//                   <Discipline
//                     value={openDisciplineId}
//                     onValueChange={setOpenDisciplineId}
//                   >
//                     {module.disciplines.map((discipline, disciplineIndex) => {
//                       const allLessonsWatched = discipline.lessons.every(
//                         (lesson) => lesson.watched,
//                       );

//                       return (
//                         <View key={discipline.id} className="mb-2">
//                           <DisciplineItem value={discipline.id.toString()}>
//                             <DisciplineTrigger
//                               value={discipline.id.toString()}
//                               index={disciplineIndex + 1}
//                               unavailable={!discipline.liberated}
//                               allLessonsWatched={allLessonsWatched}
//                             >
//                               <Text>{discipline.name}</Text>
//                             </DisciplineTrigger>

//                             <DisciplineContent value={discipline.id.toString()}>
//                               <ClassGrid>
//                                 {discipline.lessons.map(
//                                   (lesson, lessonIndex) => (
//                                     <ClassItem
//                                       key={lesson.id}
//                                       completed={lesson.watched}
//                                       actived={selectedClass?.id === lesson.id}
//                                       onPress={() => {
//                                         handleSelectLesson({
//                                           lesson,
//                                           discipline,
//                                           indexs: {
//                                             moduleIndex,
//                                             disciplineIndex,
//                                             lessonIndex,
//                                           },
//                                         });
//                                         setSelectedDiscipline(discipline);
//                                       }}
//                                     >
//                                       {lesson?.title}
//                                     </ClassItem>
//                                   ),
//                                 )}
//                                 {/* {isDisciplineEvaluation && allLessonsWatched && (
//                               <EvaluationButton
//                                 isCertificateble={discipline.isApproved}
//                                 course={course}
//                                 discipline={discipline}
//                               />
//                             )} */}
//                               </ClassGrid>
//                             </DisciplineContent>
//                           </DisciplineItem>

//                           {/* {!discipline.liberated && (
//                         <View className="mt-1 flex-row justify-center bg-red-500/10 p-2 rounded">
//                           <Text className="font-sans text-xs font-bold text-red-500 text-center">
//                             Disciplina liberada dia{' '}
//                             {HelpersUtils.formatDateOutput(discipline.liberationDate)}
//                           </Text>
//                         </View>
//                       )} */}
//                         </View>
//                       );
//                     })}
//                   </Discipline>
//                 </ModuleContent>
//               </ModuleItem>
//             );
//           })}
//         </Module>

//         {/* <View className="mt-4 gap-4">
//       {canGenerate && (
//         <>
//           {isModuleEvaluation &&
//             course.modules?.[0]?.hasExam === true &&
//             allDisiciplinesWatched && (
//               <EvaluationButton
//                 course={course}
//                 isCertificateble={course.modules?.[0].isApproved}
//                 module={course?.modules?.[0]}
//               />
//             )}
//           {isCertificateEnabled && (
//             <CertificateButton
//               course={course}
//               canGenerate={canGenerate}
//               generateCertificate={generateCertificate}
//               isOpen={isOpen}
//               onOpenChange={setIsOpen}
//             />
//           )}
//         </>
//       )}
//     </View> */}
//       </View>
//     </View>
//   );
// };

// export default LearnSidebar;
