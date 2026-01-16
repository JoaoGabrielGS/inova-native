import React from "react";
import { View, Text } from "react-native";
import { CheckCircle2, Lock } from "lucide-react-native";
import {
  Accordion,
  AccordionItem,
  AccordionTriggerNative,
  AccordionContent,
} from "../ui/accordionSidebar";
import { cn } from "@/src/lib/utils";
import Separator from "../ui/separator";

const Discipline = ({ className, children, ...props }: any) => {
  return (
    <Accordion
      variant="discipline"
      className={cn("flex-col gap-2 w-full px-3", className)}
      {...props}
    >
      {children}
    </Accordion>
  );
};

const DisciplineItem = ({ className, children, value, ...props }: any) => {
  return (
    <AccordionItem value={value} className={className} {...props}>
      {children}
    </AccordionItem>
  );
};

const DisciplineTrigger = ({
  children,
  value,
  unavailable = false,
  allLessonsWatched = false,
  className,
  ...props
}: any) => {
  return (
    <AccordionTriggerNative
      variant="discipline"
      value={value}
      disabled={unavailable}
      className={cn("px-0 py-0", className)}
      {...props}
    >
      <View className="flex-row w-full gap-4 pb-2">
        <View className="flex-1 pr-2">
          <View className="flex-row w-full items-center">
            <View className="flex-1">
              <Text className="text-[10px] font-bold text-gray-500 uppercase">
                Disciplina:
              </Text>
              <Text
                className={cn(
                  "text-sm font-bold",
                  unavailable ? "text-gray-600" : "text-white",
                )}
              >
                {children}
              </Text>
            </View>

            {allLessonsWatched && (
              <CheckCircle2 size={16} color="#10b981" className="ml-2" />
            )}

            {unavailable && (
              <View className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-grey-8">
                <Lock size={14} color="white" />
              </View>
            )}
          </View>
          <Separator className="mt-2" />
        </View>
      </View>
    </AccordionTriggerNative>
  );
};

const DisciplineContent = ({ children, value, ...props }: any) => {
  return (
    <AccordionContent variant="discipline" value={value} {...props}>
      <View className="pt-2">{children}</View>
    </AccordionContent>
  );
};

export { Discipline, DisciplineContent, DisciplineItem, DisciplineTrigger };
