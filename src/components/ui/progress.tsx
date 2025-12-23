// ProgressBar.tsx
import React from 'react';
import { View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';

interface ProgressBarProps {
    progress: number;
    height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    height = 12,
}) => {
    const width = useSharedValue(0);

    React.useEffect(() => {
        width.value = withTiming(progress, { duration: 800 });
    }, [progress]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${width.value}%`,
    }));

    return (
        <View className="w-[90%]">
            <View
                className="bg-brand-success-1 rounded-full overflow-hidden"
                style={{ height }}
            >
                <Animated.View
                    className="bg-brand-success-6 h-full rounded-full"
                    style={[animatedStyle]}
                />
            </View>
        </View>
    );
};