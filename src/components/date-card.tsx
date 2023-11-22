import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { BackdropBlur, Fill } from '@shopify/react-native-skia';
import React from 'react';
import { Animated, GestureResponderHandlers } from 'react-native';
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
                        backgroundColor="rgba(255, 255, 255, 0.11)"
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
                    {/* <BackdropBlur
                    blur={4}
                    clip={{ x: 0, y: 128, width: 256, height: 128 }}>
                    <Fill color="rgba(0, 0, 0, 0.2)" />
                </BackdropBlur> */}
                </Card.Background>
            </Card>
        </Animated.View>
    );
}
