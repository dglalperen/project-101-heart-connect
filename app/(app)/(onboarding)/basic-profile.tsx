import Button from '@src/components/button';
import InputWrapper from '@src/components/input-wrapper';
import Screen from '@src/components/screen';
import React from 'react';
import { H1, Input, SizableText, XStack, YStack } from 'tamagui';

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
                <XStack justifyContent="center">
                    <Button
                        theme="active"
                        w="$10"
                        h="$10">
                        Choose Photo
                    </Button>
                </XStack>
                <YStack h="$6" />
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
