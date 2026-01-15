import { ActivityIndicator, Image, Pressable, Text } from "react-native";

interface ButtonProps {
  text: string;
  onPress?: () => void;
  icon?: any;
  variant?: "primary" | "outline" | "social" | "icon" | "success";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  text,
  onPress,
  icon,
  variant = "primary",
  loading = false,
  className,
}: ButtonProps) {
  const baseStyles =
    "w-full h-14 rounded-lg flex-row items-center justify-center gap-3 active:opacity-80";

  const variants = {
    primary: "bg-brand-primary-10",
    outline: "border border-white bg-transparent",
    social: "border border-brand-primary-1 bg-white",
    icon: "border border-white !w-12 pl-4 bg-transparent",
    success:
      "bg-brand-lime-dark text-brand-lime-dark-foreground hover:bg-brand-lime-dark/80",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      accessibilityRole="button"
      accessibilityLabel={text}
    >
      {loading ? (
        <ActivityIndicator color="#E65100" />
      ) : (
        <>
          {icon && (
            <Image source={icon} className="w-8 h-8" resizeMode="contain" />
          )}
          <Text
            className={`text-lg font-bold ${
              variant === "primary" || variant === "outline"
                ? "text-white"
                : "text-black"
            }`}
          >
            {text}
          </Text>
        </>
      )}
    </Pressable>
  );
}
