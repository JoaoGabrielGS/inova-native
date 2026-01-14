import React, { forwardRef } from "react";
import { View } from "react-native";
import {
  Accordion,
  AccordionItem,
  AccordionTriggerNative,
  AccordionContent,
} from "../ui/accordionSidebar";
import { Separator } from "../ui/separator";
import { cn } from "@/src/lib/utils";

// --- Module (Root) ---
const Module = ({ className, children, ...props }: any) => {
  return (
    <Accordion
      variant="module"
      className={cn("flex-col gap-4", className)}
      {...props}
    >
      {children}
    </Accordion>
  );
};

// --- ModuleItem ---
const ModuleItem = ({ className, children, value, ...props }: any) => {
  return (
    <AccordionItem value={value} className={className} {...props}>
      {children}
    </AccordionItem>
  );
};

// --- ModuleTrigger ---
const ModuleTrigger = ({ children, value, ...props }: any) => {
  return (
    <AccordionTriggerNative variant="module" value={value} {...props}>
      <View className="flex-row items-center gap-2">{children}</View>
      <Separator className="mb-1 mt-2" />
    </AccordionTriggerNative>
  );
};

// --- ModuleContent ---
const ModuleContent = ({ children, value, ...props }: any) => {
  return (
    <AccordionContent variant="module" value={value} {...props}>
      {children}
    </AccordionContent>
  );
};

export { Module, ModuleItem, ModuleTrigger, ModuleContent };
