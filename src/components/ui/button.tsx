import { ActivityIndicator, Image, Pressable, Text } from 'react-native';

interface ButtonProps {
  text: string;
  onPress?: () => void;
  icon?: any;
  variant?: "primary" | "outline" | "social";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

export function Button({
  text,
  onPress,
  icon,
  variant = "primary",
  loading = false,
}: ButtonProps) {
  const baseStyles =
    "w-full h-14 rounded-3xl flex-row items-center justify-center gap-3 active:opacity-80";

  const variants = {
    primary: "bg-brand-complementary-2 border border-dark-1",
    outline: "border border-brand-dark-1 bg-white",
    social: "border border-dark-1 bg-white",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className={`${baseStyles} ${variants[variant]}`}
      accessibilityRole="button"
      accessibilityLabel={text}
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <>
          {icon && <Image source={icon} className="w-6 h-6" resizeMode="contain" />}
          <Text
            className={`text-lg font-bold ${
              variant === "primary" ? "text-brand-dark-1" : "text-brand-primary-2"
            }`}
          >
            {text}
          </Text>
        </>
      )}
    </Pressable>
  );
}
