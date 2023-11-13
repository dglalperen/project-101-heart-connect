import Screen from '@src/components/screen';
import Assets from '@src/theme/assets';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, View, useWindowDimensions } from 'react-native';
import { Button, Stack, Text, XStack, YStack } from 'tamagui';

interface InformationCarouselContent {
    title: string;
    description: string;
}

const imageCarouselData = [
    { key: 'spacer-1' },
    {
        img: Assets.Girl1(),
        key: 'item-1',
    },
    {
        img: Assets.Girl2(),
        key: 'item-2',
    },
    {
        img: Assets.Girl3(),
        key: 'item-3',
    },
    {
        img: Assets.Girl1(),
        key: 'item-4',
    },
    {
        img: Assets.Girl2(),
        key: 'item-5',
    },
    {
        img: Assets.Girl3(),
        key: 'item-6',
    },
    { key: 'spacer-2' },
];

const duplicateDataWithUniqueKeys = () => {
    // First, duplicate the array
    const duplicatedArray = [...imageCarouselData, ...imageCarouselData.slice(1)];

    // Then, modify the keys of the second set
    return duplicatedArray.map((item, index) => {
        // If it's part of the second set, modify the key
        if (index >= imageCarouselData.length) {
            return { ...item, key: `${item.key}-duplicate` };
        }
        return item;
    });
};

const informationCarouselContent: InformationCarouselContent[] = [
    {
        title: 'Algorithm',
        description: 'Users going through a vetting process to ensure you never match with bots.',
    },
    {
        title: 'Matches',
        description: 'We match you with people that have a large array of similar interests.',
    },
    {
        title: 'Premium',
        description: 'Sign up today and enjoy the first month of premium benefits on us.',
    },
];

function Onboarding() {
    const { width: screenWidth } = useWindowDimensions();
    const ITEM_SIZE = screenWidth * 0.6;
    const SPACER_SIZE = (screenWidth - ITEM_SIZE) / 2;
    const scrollX = useRef(new Animated.Value(0)).current;

    const infoCarouselRef = useRef<FlatList<InformationCarouselContent> | null>(null);
    const [activeInfoIndex, setActiveInfoIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const imageData = useRef(duplicateDataWithUniqueKeys()).current;
    const currentOffsetX = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeInfoIndex + 1) % informationCarouselContent.length;
            setActiveInfoIndex(nextIndex);

            if (infoCarouselRef.current) {
                infoCarouselRef.current.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [activeInfoIndex]);

    const scrollCountRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollCountRef.current >= 5) {
                flatListRef.current?.scrollToOffset({ offset: ITEM_SIZE, animated: true });
                currentOffsetX.current = ITEM_SIZE;
                scrollCountRef.current = 0;
            } else {
                // Continue scrolling to the next image
                const nextOffset = (scrollCountRef.current + 1) * ITEM_SIZE;
                flatListRef.current?.scrollToOffset({ offset: nextOffset, animated: true });

                scrollCountRef.current += 1;
            }
        }, 4000); // scrolling interval

        return () => clearInterval(interval);
    }, []);

    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: true,
        listener: event => {
            currentOffsetX.current = event.nativeEvent.contentOffset.x;
        },
    });

    return (
        <Screen
            justifyContent="center"
            alignItems="center">
            <Animated.FlatList
                ref={flatListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToInterval={ITEM_SIZE}
                decelerationRate={0}
                bounces={false}
                onScroll={onScroll}
                data={imageData}
                renderItem={({ item, index }) => {
                    if (!item.img) {
                        return <View style={{ width: SPACER_SIZE }} />;
                    }

                    const inputRange = [
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                    ];
                    const scale = scrollX.interpolate({
                        inputRange: inputRange,
                        outputRange: [0.8, 1, 0.8],
                    });
                    return (
                        <Animated.View
                            style={{
                                marginVertical: 50,
                                width: ITEM_SIZE,
                                alignItems: 'center',
                                backgroundColor: '$green10Dark',
                            }}>
                            <Animated.Image
                                style={{ transform: [{ scale: scale }], width: 200, height: 300 }}
                                source={item.img}
                                resizeMode="contain"
                            />
                        </Animated.View>
                    );
                }}
            />
            <FlatList
                ref={infoCarouselRef}
                data={informationCarouselContent}
                showsHorizontalScrollIndicator={false}
                style={{ maxHeight: screen.height * 0.2 }}
                horizontal
                pagingEnabled
                renderItem={({ item, index }) => (
                    <Stack
                        key={index}
                        width={screen.width}
                        height={screen.height * 0.2}
                        justifyContent="center"
                        alignItems="center">
                        <Text
                            color="$primary"
                            fontWeight="600"
                            fontSize="$8"
                            mb="$4">
                            {item.title}
                        </Text>
                        <Text
                            textAlign="center"
                            marginHorizontal="$8"
                            fontSize="$5">
                            {item.description}
                        </Text>
                    </Stack>
                )}
            />
            <XStack
                mt="$1"
                mb="$8"
                justifyContent="center"
                alignItems="center">
                {informationCarouselContent.map((_, index) => (
                    <YStack
                        key={index}
                        width={10}
                        height={10}
                        borderRadius={5}
                        backgroundColor={activeInfoIndex === index ? '$primary' : 'lightgray'}
                        marginHorizontal={6}
                    />
                ))}
            </XStack>
            <Button
                size="$5"
                width={screen.width * 0.8}
                mb="$6"
                backgroundColor="$primary"
                fontWeight="500"
                borderRadius={15}
                color="white">
                Create an Account
            </Button>
            <XStack
                alignItems="center"
                justifyContent="center"
                w="$25">
                <Text mr="$1">Already have an account?</Text>
                <Link href="/login">
                    <Text
                        fontWeight="bold"
                        color="$primary">
                        Sign In
                    </Text>
                </Link>
            </XStack>
            <YStack height="$4" />
        </Screen>
    );
}

export default Onboarding;
