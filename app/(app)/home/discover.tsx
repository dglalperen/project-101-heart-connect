import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackdropBlur, Fill } from '@shopify/react-native-skia';
import Button from '@src/components/button';
import Screen from '@src/components/screen';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Card, CardProps, H5, H6, Image, Text, View, XStack, YStack, ZStack } from 'tamagui';

function DiscoverScreen() {
    const navigation = useNavigation();

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         title: 'Discover Screen',
    //         headerRight: () => (
    //             <Button
    //                 color="$primary"
    //                 fontWeight="bold"
    //                 fontSize="$5"
    //                 borderColor="red"
    //                 >
    //                 Skip
    //             </Button>
    //         ),
    //     });
    // }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <SizableText>selam</SizableText>,
            title: 'Selam',
        });
    }, [navigation]);

    return (
        <Screen
            alignItems="center"
            mt="$11">
            <YStack>
                <DateCard ml="$5" />

                <XStack
                    alignContent="center"
                    alignItems="center"
                    space="$4"
                    mt="$13">
                    <Button
                        circular
                        borderColor="black"
                        size="$8">
                        <MaterialCommunityIcons
                            name="close"
                            color="#E94057"
                            size={30}
                        />
                    </Button>
                    <Button
                        circular
                        borderColor="black"
                        backgroundColor="#E94057"
                        size="$10">
                        <MaterialCommunityIcons
                            name="heart"
                            color="white"
                            size={55}
                        />
                    </Button>
                    <Button
                        circular
                        borderColor="black"
                        size="$8">
                        <MaterialCommunityIcons
                            name="star"
                            color="purple"
                            size={30}
                        />
                    </Button>
                </XStack>
            </YStack>
        </Screen>
    );
}

export default DiscoverScreen;

export function DateCard(props: CardProps) {
    return (
        <Card
            elevate
            borderRadius={50}
            width={260}
            height={400}
            scale={1.3}
            {...props}>
            <Card.Header>
                <XStack
                    backgroundColor="rgba(255, 255, 255, 0.1)"
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
                        Jessica Parker, 23
                    </H5>
                    <H6
                        size="$2"
                        color="white">
                        Professional Model
                    </H6>
                </YStack>
            </Card.Footer>
            <Card.Background fullscreen>
                <Image
                    flex={1}
                    resizeMode="contain"
                    alignSelf="center"
                    source={{
                        width: 300,
                        height: 300,
                        uri: require('../../../assets/images/card-photo.png'),
                    }}
                />
                {/* <BackdropBlur
                    blur={4}
                    clip={{ x: 0, y: 128, width: 256, height: 128 }}>
                    <Fill color="rgba(0, 0, 0, 0.2)" />
                </BackdropBlur> */}
            </Card.Background>
        </Card>
    );
}
