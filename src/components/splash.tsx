import { Image } from 'react-native';
import { View } from 'react-native';
import type { ReactNode } from 'react';
import inova from '@/assets/icons/inova-a.png';

const Splash = ({
    children,
}: {
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <View
            className="absolute inset-0 z-50 flex-1 flex-col items-center justify-center gap-4 bg-brand-grey-10"
        >
            <View className="h-36 w-36">
                <Image
                    source={inova}
                    className="h-full w-full animate-pulse"
                    resizeMode="contain"
                />
            </View>
            {children}
        </View>
    );
};

export default Splash;