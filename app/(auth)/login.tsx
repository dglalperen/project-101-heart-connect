import Screen from '@src/components/screen';
import LoginForm from '@src/modules/auth-module/components/login-form';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { H1, SizableText, YStack } from 'tamagui';

function LoginScreen() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <SizableText>selam</SizableText>,
            title: 'Selam',
        });
    }, []);

    return (
        <Screen mx="$7">
            <YStack h="$10" />
            <H1>My mobile</H1>
            <SizableText>
                Please enter your valid phone number. We will send you a 4-digit code to verify your
                account.
            </SizableText>
            <LoginForm />
        </Screen>
    );
}

export default LoginScreen;
