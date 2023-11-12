import useSession from '@src/hooks/session';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { YStack, styled } from 'tamagui';

const Container = styled(YStack, {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
});

const LoadingScreen = () => {
    const rotation = useSharedValue(0);
    const { isLoggedIn, initialized } = useSession();

    useEffect(() => {
        console.log('loading');

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
        <Container>
            <Animated.View
                style={[{ height: 50, width: 50, backgroundColor: '#E94057' }, animatedStyle]}
            />
        </Container>
    );
};

export default LoadingScreen;
