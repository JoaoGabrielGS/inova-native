import React, { useState, createContext, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { ChevronDown } from "lucide-react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionContext = createContext<{
  activeValue: string | null;
  setActiveValue: (val: string | null) => void;
} | null>(null);

export const Accordion = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [activeValue, setActiveValue] = useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ activeValue, setActiveValue }}>
      <View style={styles.container} className={className}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
};

const Item = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return <View>{children}</View>;
};

const Trigger = ({
  value,
  children,
  onPress,
  className,
}: {
  value: string;
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}) => {
  const context = useContext(AccordionContext);
  const isOpen = context?.activeValue === value;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    context?.setActiveValue(isOpen ? null : value);

    if (onPress && !isOpen) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={toggle}
      style={styles.trigger}
      className={className}
    >
      <Text style={styles.triggerText}>{children}</Text>
      <ChevronDown
        size={18}
        color="#FFF"
        style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
      />
    </TouchableOpacity>
  );
};

const Content = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const context = useContext(AccordionContext);
  const isOpen = context?.activeValue === value;

  if (!isOpen) return null;

  return (
    <View className={className}>
      <Text style={styles.contentText}>{children}</Text>
    </View>
  );
};

Accordion.Item = Item;
Accordion.Trigger = Trigger;
Accordion.Content = Content;

const styles = StyleSheet.create({
  container: { width: "100%" },
  trigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  triggerText: { fontSize: 16, fontWeight: "500", color: "#FFF" },
  contentText: { fontSize: 14, color: "#FFF", lineHeight: 20 },
});
