import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { BackdropBlur, Fill } from '@shopify/react-native-skia';
import React from 'react';
import { Animated } from 'react-native';
import { Card, CardProps, H5, H6, Image, Text, XStack, YStack, ZStack } from 'tamagui';

// Possibly change later to take in a user object with all needed properties
interface DateCardProps extends CardProps {
    imageName: string;
    firstName: string;
    lastName: string;
    age: number;
    bio: string;
}

export default function DateCard({
    imageName,
    firstName,
    lastName,
    age,
    bio,
    ...other
}: DateCardProps) {
    // Testing purposes
    const images = {
        p1: require(`../../assets/images/card-photo.png`),
        p2: require(`../../assets/images/card-photo2.png`),
    };

    return (
        <Animated.View>
            <Card
                elevate
                width={260}
                height={400}
                {...other}>
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
                            {firstName} {lastName}, {age}
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
                        source={imageName === 'p1' ? images.p1 : images.p2}
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
