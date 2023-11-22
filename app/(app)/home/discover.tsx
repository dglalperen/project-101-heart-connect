import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '@src/components/button';
import DateCard from '@src/components/date-card';
import Screen from '@src/components/screen';
import { users as usersArray } from '@src/utils/seed-user-data';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';
import { XStack, YStack, ZStack } from 'tamagui';

export default function DiscoverScreen() {
    const navigation = useNavigation();

    const { height } = Dimensions.get('screen');

    const [users, setUsers] = useState(usersArray);

    // Animated values for swipe and tilt
    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Reset users data if the array is empty
        if (!users.length) {
            setUsers(usersArray);
        }
    }, [users.length]);

    // PanResponder configuration
    const panResponder = PanResponder.create({
        // Allow pan responder to activate
        onMoveShouldSetPanResponder: () => true,

        // Handle card movement while dragging
        onPanResponderMove: (_, { dx, dy, y0 }) => {
            swipe.setValue({ x: dx, y: dy });
            tiltSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1);
        },

        // Handle card release after dragging
        onPanResponderRelease: (_, { dx, dy }) => {
            const direction = Math.sign(dx);
            const isActionActive = Math.abs(dx) > 100;

            if (isActionActive) {
                // Swipe the card off the screen
                Animated.timing(swipe, {
                    duration: 100,
                    toValue: {
                        x: direction * 500,
                        y: dy,
                    },
                    useNativeDriver: true,
                }).start(removeTopCard);
            } else {
                // Return the card to its original position
                Animated.spring(swipe, {
                    toValue: {
                        x: 0,
                        y: 0,
                    },
                    useNativeDriver: true,
                    friction: 5,
                }).start();
            }
        },
    });

    // remove the top card from the users array
    const removeTopCard = useCallback(() => {
        setUsers(prevState => prevState.slice(1));
        swipe.setValue({ x: 0, y: 0 });
    }, [swipe]);

    // handle user choice (left or right swipe)
    const handleChoice = useCallback(
        (direction: number) => {
            Animated.timing(swipe.x, {
                toValue: direction * 500,
                duration: 400,
                useNativeDriver: true,
            }).start(removeTopCard);
        },
        [removeTopCard, swipe.x],
    );

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
                    mt={75}
                    ml={25}>
                    {users
                        .map(({ name, bio, age, image }, index) => {
                            const isFirst = index === 0;
                            const dragHandlers = isFirst ? panResponder.panHandlers : {};
                            if (index >= 1) {
                                return (
                                    <DateCard
                                        key={name}
                                        imageName={image}
                                        name={name}
                                        age={age}
                                        bio={bio}
                                        isFirst={isFirst}
                                        swipe={swipe}
                                        tiltSign={tiltSign}
                                        isSecond
                                        {...dragHandlers}
                                    />
                                );
                            }

                            return (
                                <DateCard
                                    key={name}
                                    imageName={image}
                                    name={name}
                                    age={age}
                                    bio={bio}
                                    isFirst={isFirst}
                                    swipe={swipe}
                                    tiltSign={tiltSign}
                                    {...dragHandlers}
                                />
                            );
                        })
                        .reverse()}
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
