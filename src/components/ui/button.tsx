import { ActivityIndicator, Image, Pressable, Text } from 'react-native'

interface ButtonProps {
  text: string
  onPress?: () => void
  icon?: any
  variant?: 'primary' | 'outline' | 'social' | 'icon'
  loading?: boolean
  disabled?: boolean
  className?: string
}

export function Button({
  text,
  onPress,
  icon,
  variant = 'primary',
  loading = false
}: ButtonProps) {
  const baseStyles =
    'w-full h-14 rounded-lg flex-row items-center justify-center gap-3 active:opacity-80'

  const variants = {
    primary: 'bg-brand-primary-10 border border-dark-1',
    outline: 'border border-brand-dark-1 bg-white',
    social: 'border border-brand-primary-1 bg-white',
    icon: 'border border-white !w-12 pl-4 bg-transparent'
  }

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
          {icon && (
            <Image source={icon} className="w-8 h-8" resizeMode="contain" />
          )}
          <Text
            className={`text-lg font-bold ${
              variant === 'primary'
                ? 'text-white'
                : 'text-black'
            }`}
          >
            {text}
          </Text>
        </>
      )}
    </Pressable>
  )
}
