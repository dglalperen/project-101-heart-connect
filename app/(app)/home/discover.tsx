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
            mt="$12">
            <YStack>
                <ZStack
                    flex={1}
                    alignContent="center"
                    alignItems="center"
                    ml={25}>
                    <DateCard
                        scale={1.14}
                        y={-57}
                        imageName="p2"
                    />
                    <DateCard
                        scale={1.3}
                        imageName="p1"
                    />
                </ZStack>
                <XStack
                    flex={1}
                    alignContent="center"
                    alignItems="center"
                    mt={230}
                    space="$4">
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

type DateCardProps = {
    imageName: string;
    props?: CardProps;
};

export function DateCard(props: DateCardProps) {
    const { imageName, ...other } = props;

    // Testing purposes
    const images = {
        p1: require(`../../../assets/images/card-photo.png`),
        p2: require(`../../../assets/images/card-photo2.png`),
    };

    return (
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
                        Jessica Parker, 23
                    </H5>
                    <H6
                        size="$2"
                        color="white">
                        Professional Model
                    </H6>
                </YStack>
            </Card.Footer>
            <Card.Background fullscreen borderRadius="$5">
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
    );
}
