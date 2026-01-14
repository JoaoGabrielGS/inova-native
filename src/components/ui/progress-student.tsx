import * as React from "react";
import { View } from "react-native";

// Opcional: Garante que o componente aceite className se não estiver configurado globalmente

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof View> {
  value?: number; // 0 a 100
}

const ProgressStudentBar = React.forwardRef<View, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    // Garante que o valor não saia do range 0-100
    const safeValue = Math.min(Math.max(value, 0), 100);

    return (
      <View
        ref={ref}
        className={`relative h-2 w-full overflow-hidden rounded-full bg-slate-800 ${className}`}
        {...props}
      >
        <View
          className="h-full bg-green-500"
          style={{ width: `${safeValue}%` }}
        />
      </View>
    );
  },
);

ProgressStudentBar.displayName = "Progress";

export { ProgressStudentBar };
