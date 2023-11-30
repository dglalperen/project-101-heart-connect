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

    // TODO: Text and right header button
    // Set the navigation buttons for this screen
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    h="$5"
                    alignSelf="flex-start"
                    outlined>
                    <MaterialCommunityIcons
                        name="chevron-left"
                        size={25}
                    />
                </Button>
            ),
        });
    });

    useEffect(() => {
        // TODO: Pagination of users (10 - 20 at a time)
        // TESTING: Reset users data if the array is empty
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
                }).start(() => removeAndHandleChoice(direction, false));
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

    const removeAndHandleChoice = useCallback(
        (direction: number, isStarPressed: boolean) => {
            if (direction === -1) {
                // TODO: Dislike Logic
                console.log('DISLIKE');
            } else if (isStarPressed && direction === 1) {
                // TODO: Star  logic
                console.log('Star Pressed');
            } else {
                // TODO: Like Logic
                console.log('LIKE');
            }
            // Remove card from the array
            setUsers(prevState => prevState.slice(1));
            swipe.setValue({ x: 0, y: 0 });
        },
        [swipe],
    );

    // handle user choice (left or right swipe)
    const handleButtonChoice = useCallback(
        (direction: number, isStarPressed: boolean) => {
            // Animation for star
            if (isStarPressed) {
                Animated.timing(swipe.y, {
                    toValue: -1 * 500,
                    duration: 400,
                    useNativeDriver: true,
                }).start(() => removeAndHandleChoice(direction, isStarPressed));
            } else {
                // Animation for nope and like
                Animated.timing(swipe.x, {
                    toValue: direction * 500,
                    duration: 400,
                    useNativeDriver: true,
                }).start(() => removeAndHandleChoice(direction, isStarPressed));
            }
        },
        [removeAndHandleChoice, swipe.x, swipe.y],
    );

    return (
        <Screen
            alignItems="center"
            mx="$7"
            mt="$3">
            <YStack>
                <ZStack
                    flex={1}
                    alignContent="center"
                    alignItems="center"
                    mt={75}
                    ml={25}>
                    {users
                        .map(({ name, bio, age, image, distance }, index) => {
                            const isFirst = index === 0;
                            const dragHandlers = isFirst ? panResponder.panHandlers : {};
                            // if card is not first then remove the unused details and styling
                            if (index >= 1) {
                                return (
                                    <DateCard
                                        key={name}
                                        imageName={image}
                                        name={name}
                                        age={age}
                                        bio={bio}
                                        isFirst={isFirst}
                                        distance={distance}
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
                                    distance={distance}
                                    swipe={swipe}
                                    tiltSign={tiltSign}
                                    {...dragHandlers}
                                />
                            );
                        })
                        .reverse()}
                </ZStack>
                <DiscoverButtonGroup handleChoice={handleButtonChoice} />
            </YStack>
        </Screen>
    );
}

function DiscoverButtonGroup({ handleChoice }: any) {
    return (
        <XStack
            flex={1}
            alignContent="center"
            alignItems="center"
            mt={300}
            space="$5">
            <Button
                circular
                elevation={8}
                size="$8"
                onPress={() => handleChoice(-1, false)}>
                <MaterialCommunityIcons
                    name="close"
                    color="#E94057"
                    size={30}
                />
            </Button>
            <Button
                circular
                elevation={10}
                backgroundColor="#E94057"
                size="$10"
                onPress={() => handleChoice(1, false)}>
                <MaterialCommunityIcons
                    name="heart"
                    color="white"
                    size={55}
                />
            </Button>
            <Button
                circular
                elevation={8}
                size="$8"
                onPress={() => handleChoice(1, true)}>
                <MaterialCommunityIcons
                    name="star"
                    color="purple"
                    size={30}
                />
            </Button>
        </XStack>
    );
}
