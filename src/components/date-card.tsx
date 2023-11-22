import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { BackdropBlur, Fill } from '@shopify/react-native-skia';
import React, { useCallback } from 'react';
import { Animated, GestureResponderHandlers, StyleSheet } from 'react-native';
import { Card, H5, H6, Image, Text, XStack, YStack } from 'tamagui';

// Possibly change later to take in a user object with all needed properties
interface DateCardProps extends GestureResponderHandlers {
    imageName: any;
    name: string;
    age: number;
    bio: string;
    isFirst: boolean;
    swipe: Animated.ValueXY;
    tiltSign: Animated.Value;
    isSecond?: boolean;
}

// TODO: Add side photo scrolling support
export default function DateCard({
    imageName,
    name,
    age,
    bio,
    isFirst,
    swipe,
    tiltSign,
    isSecond,
    ...other
}: DateCardProps) {
    // Calculate the rotation of the card based on swipe gesture
    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['8deg', '0deg', '-8deg'],
    });

    // Animated style for the card with rotation and translation
    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }],
    };

    // Opacity animation for the "like" button
    const likeOpacity = swipe.x.interpolate({
        inputRange: [0, 500],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    // Opacity animation for the "nope" button
    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-500, -25],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    // Function to render the "like" and "nope" buttons conditionally
    const renderChoice = useCallback(() => {
        return (
            <>
                <Animated.View style={[styles.overlayLike, { opacity: likeOpacity }]} />
                <Animated.View style={[styles.overlayNope, { opacity: nopeOpacity }]} />
            </>
        );
    }, [likeOpacity, nopeOpacity]);

    return (
        <Animated.View
            style={[isFirst && animatedCardStyle]}
            {...other}>
            <Card
                elevate={!isSecond}
                y={isSecond ? -45 : 0}
                scale={isSecond ? 1.15 : 1.3}
                width={260}
                height={400}>
                <Card.Header>
                    <XStack
                        backgroundColor="rgba(189, 195, 199, 0.50)"
                        width={55}
                        height={30}
                        alignContent="center"
                        alignItems="center"
                        px={6}
                        borderRadius={5}>
                        <MaterialCommunityIcons
                            name="map-marker-outline"
                            color="white"
                            size={16}
                        />
                        <Text
                            fontSize="$1"
                            color="white">
                            1 km
                        </Text>
                    </XStack>
                </Card.Header>
                <Card.Footer>
                    <YStack
                        ml="$2"
                        alignItems="flex-start"
                        flex={1}>
                        <H5
                            mb={-27}
                            mt={-5}
                            color="white">
                            {name}, {age}
                        </H5>
                        <H6
                            size="$2"
                            color="white">
                            {bio}
                        </H6>
                    </YStack>
                </Card.Footer>
                <Card.Background
                    fullscreen
                    borderRadius="$5">
                    <Image
                        flex={1}
                        resizeMode="contain"
                        alignSelf="center"
                        source={imageName}
                    />
                    {/* TODO: Implement background blur to the footer of the card */}
                    {/* <BackdropBlur
                    blur={4}
                    clip={{ x: 0, y: 128, width: 256, height: 128 }}>
                    <Fill color="rgba(0, 0, 0, 0.2)" />
                </BackdropBlur> */}
                </Card.Background>
                {isFirst && renderChoice()}
            </Card>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    likeContainer: {
        left: 45,
        transform: [{ rotate: '-30deg' }],
    },
    nopeContainer: {
        right: 45,
        transform: [{ rotate: '30deg' }],
    },
    overlayLike: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'green',
    },
    overlayNope: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'red',
    },
});
