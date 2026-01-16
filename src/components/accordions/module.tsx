import { cn } from "@/src/lib/utils";
import React from "react";
import { View } from "react-native";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerNative,
} from "../ui/accordionSidebar";
import Separator from "../ui/separator";

const Module = ({ className, children, ...props }: any) => {
  return (
    <Accordion
      variant="module"
      className={cn("flex-col gap-4 w-full", className)}
      {...props}
    >
      {children}
    </Accordion>
  );
};

const ModuleItem = ({ className, children, value, ...props }: any) => {
  return (
    <AccordionItem value={value} className={className} {...props}>
      {children}
    </AccordionItem>
  );
};

const ModuleTrigger = ({ children, value, ...props }: any) => {
  return (
    <AccordionTriggerNative variant="module" value={value} {...props}>
      <View className="flex-row items-center gap-2">{children}</View>
      <Separator className="mb-1 mt-2" />
    </AccordionTriggerNative>
  );
};

const ModuleContent = ({ children, value, ...props }: any) => {
  return (
    <AccordionContent variant="module" value={value} {...props}>
      {children}
    </AccordionContent>
  );
};

export { Module, ModuleContent, ModuleItem, ModuleTrigger };
