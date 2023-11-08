import Button from '@src/components/button';
import ImagePickerExample from '@src/components/image-picker';
import InputWrapper from '@src/components/input-wrapper';
import Screen from '@src/components/screen';
import React from 'react';
import { H1, Input, SizableText, XStack, YStack, ZStack } from 'tamagui';

function BasicProfileScreen() {
    return (
        <Screen mx="$7">
            <YStack h="$10" />
            <H1>Profile Details</H1>
            <YStack h="$10" />
            <YStack
            // justifyContent="center"
            // alignItems="center"
            >
                <XStack
                    justifyContent="center"
                    alignItems="center">
                    <ImagePickerExample />
                    {/* <ZStack flex={1}>
                    <ImagePickerExample />
                    <YStack
                        backgroundColor="$color"
                        borderRadius="$2"
                        padding="$2"
                        y={60}
                        x={10}
                    />
                </ZStack> */}
                </XStack>
                <YStack h="$7" />
                <YStack>
                    <Input
                        mb="$4"
                        height="$5"
                        placeholder="First Name"
                    />
                    <Input
                        mb="$4"
                        height="$5"
                        placeholder="Last Name"
                    />

                    <Button
                        theme="active"
                        h="$5">
                        Choose birthday date
                    </Button>
                </YStack>

                <YStack h="$12" />

                <Button
                    theme="active"
                    h="$5">
                    Confirm
                </Button>
            </YStack>
        </Screen>
    );
}

export default BasicProfileScreen;
