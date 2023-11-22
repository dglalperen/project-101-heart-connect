import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '@src/components/button';
import DateCard from '@src/components/date-card';
import Screen from '@src/components/screen';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { XStack, YStack, ZStack } from 'tamagui';

export default function DiscoverScreen() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Discover Screen',
            headerRight: () => (
                <Button
                    color="$primary"
                    fontWeight="bold"
                    fontSize="$5"
                    borderColor="red"
                    backgroundColor="black">
                    Skip
                </Button>
            ),
        });
    }, [navigation]);

    return (
        <Screen
            alignItems="center"
            mx="$7">
            <YStack>
                <ZStack
                    flex={1}
                    alignContent="center"
                    alignItems="center"
                    mt={90}
                    ml={25}>
                    {/* Next Card in the sequence */}
                    <DateCard
                        scale={1.14}
                        y={-57}
                        imageName="p2"
                        firstName="Camila"
                        lastName="Snow"
                        age={23}
                        bio="Marketer"
                    />
                    {/* Current Card in the sequence */}
                    <DateCard
                        scale={1.3}
                        imageName="p1"
                        firstName="Jessica"
                        lastName="Parker"
                        age={23}
                        bio="Professional Model"
                    />
                </ZStack>
                <DiscoverButtonGroup />
            </YStack>
        </Screen>
    );
}

function DiscoverButtonGroup() {
    return (
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
    );
}
