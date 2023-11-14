import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '@src/components/button';
import Screen from '@src/components/screen';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { H2, YStack } from 'tamagui';

function GenderScreen() {
    const navigation = useNavigation();
    const router = useRouter();

    const [isSelected, setIsSelected] = useState<string | undefined>();

    const variants = [
        { value: 'Woman' },
        { value: 'Man' },
        { value: 'Genderqueer/Non-Binary' },
        { value: 'Prefer not to disclose' },
    ];

    const pressAction = (type: string) => {
        setIsSelected(type);
    };

    const toNextScreen = () => {
        router.push('/passions');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => {
                        toNextScreen();
                    }}
                    color="$primary"
                    fontWeight="bold"
                    fontSize="$5">
                    Skip
                </Button>
            ),
        });
    }, [navigation, router]);

    return (
        <Screen mx="$7">
            <H2 mb="$13">I am a</H2>

            <YStack
                space="$3"
                mb="$20">
                {variants.map(value => (
                    <Button
                        chosen={isSelected === value.value}
                        outlined
                        color={isSelected === value.value ? 'white' : 'black'}
                        h="$6"
                        id={value.value}
                        // iconAfter={
                        //     <MaterialCommunityIcons
                        //         name="check"
                        //         size={20}
                        //         color={isSelected === value.value ? 'white' : 'black'}
                        //     />
                        // }
                        flexDirection="row"
                        fontSize="$6"
                        justifyContent="space-between"
                        onPress={() => pressAction(value.value)}>
                        {value.value}
                    </Button>
                ))}
            </YStack>

            <Button
                disabled={!isSelected}
                opacity={!isSelected ? 0.5 : 1}
                chosen
                h="$5"
                mt="$4"
                onPress={() => toNextScreen()}>
                Continue
            </Button>
        </Screen>
    );
}

export default GenderScreen;
