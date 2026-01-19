import { cn } from "@/src/lib/utils";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react-native";
import React, { createContext, useContext, useState } from "react";
import { LayoutAnimation, TouchableOpacity, View } from "react-native";

const AccordionContext = createContext<{
  activeItem: string | null;
  toggleItem: (value: string) => void;
  variant?: any;
}>({ activeItem: null, toggleItem: () => {} });

const triggerVariants = cva(
  "flex-row items-center justify-between p-4 rounded-md",
  {
    variants: {
      variant: {
        default: "bg-slate-800",
        module: "w-full bg-transparent border-b border-white/10",
        sidebar: "bg-transparent py-4",
        lesson: "bg-zinc-900 rounded-lg",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const contentVariants = cva("overflow-hidden", {
  variants: {
    variant: {
      default: "bg-slate-900 p-4 mt-1 rounded-md",
      module: "mt-2 pl-4",
      sidebar: "bg-transparent",
      lesson: "p-4 bg-zinc-800 border-t border-zinc-700",
    },
  },
  defaultVariants: { variant: "default" },
});

export const Accordion = ({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: any;
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleItem = (value: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveItem(activeItem === value ? null : value);
  };

  return (
    <AccordionContext.Provider value={{ activeItem, toggleItem, variant }}>
      <View className={cn("flex-col gap-2", className)}>{children}</View>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) => {
  return <View className={cn("mb-2", className)}>{children}</View>;
};

export const AccordionTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { activeItem, toggleItem, variant } = useContext(AccordionContext);
};

export const AccordionTriggerNative = ({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) => {
  const { activeItem, toggleItem, variant } = useContext(AccordionContext);
  const isOpen = activeItem === value;

  return (
    <TouchableOpacity
      onPress={() => toggleItem(value)}
      className={cn(triggerVariants({ variant }), className)}
      activeOpacity={0.7}
    >
      <View className="flex-1">{children}</View>
      <View style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}>
        <ChevronDown size={20} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export const AccordionContent = ({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) => {
  const { activeItem, variant } = useContext(AccordionContext);
  const isOpen = activeItem === value;

  if (!isOpen) return null;

  return (
    <View className={cn(contentVariants({ variant }), className)}>
      {children}
    </View>
  );
};
