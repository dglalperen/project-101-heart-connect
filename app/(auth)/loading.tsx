import { MaterialCommunityIcons } from '@expo/vector-icons';
import useSession from '@src/hooks/session';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { YStack } from 'tamagui';

const LoadingScreen = () => {
    const rotation = useSharedValue(0);
    const { isLoggedIn, initialized } = useSession();

    useEffect(() => {
        if (initialized) {
            if (isLoggedIn) {
                router.push('/(app)/home/account');
            } else {
                router.push('/signup');
            }
        }
    }, [isLoggedIn, initialized]);

    rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false,
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
            }}>
            <Animated.View style={[{ height: 100, width: 100, borderRadius: 20 }, animatedStyle]}>
                <MaterialCommunityIcons
                    name="loading"
                    size={100}
                    color="#E94057"
                />
            </Animated.View>
            <YStack height="$12" />
        </View>
    );
};

export default LoadingScreen;
