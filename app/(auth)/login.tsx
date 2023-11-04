import InputWrapper from '@src/components/input-wrapper';
import PhoneCodePicker from '@src/components/phone-code-picker';
import Screen from '@src/components/screen';
import React, { useState } from 'react';
import { Button, H1, Input, SizableText, XStack, YStack } from 'tamagui';

function LoginScreen() {
    const [phoneCode, setPhoneCode] = useState('+1');

    return (
        <Screen mx="$7">
            <YStack h="$10" />
            <H1>My mobile</H1>
            <SizableText>
                Please enter your valid phone number. We will send you a 4-digit code to verify your
                account.
            </SizableText>
            <YStack h="$3" />
            <InputWrapper
                leftElement={
                    <XStack ai="center">
                        <PhoneCodePicker
                            phoneCode={phoneCode}
                            onChangePhoneCode={setPhoneCode}
                        />
                        <YStack
                            h={18}
                            w={1}
                            bg="$placeholderColor"
                            mr="$3"
                        />
                    </XStack>
                }>
                {({ leftElementWidth }) => (
                    <Input
                        size="$5"
                        placeholder="Phone Number"
                        f={1}
                        pl={leftElementWidth}
                        fontSize="$4"
                        keyboardType="number-pad"
                        br={15}
                    />
                )}
            </InputWrapper>
            <YStack h="$6" />
            <Button
                size="$5"
                bg="$red10"
                color="white">
                Continue
            </Button>
        </Screen>
    );
}

export default LoginScreen;
