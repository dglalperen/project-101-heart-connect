import Screen from '@src/components/screen';
import { Link } from 'expo-router';
import React from 'react';
import { Button, H1, H2, H3, Text } from 'tamagui';

function LoginScreen() {
    return (
        <Screen
            justifyContent="center"
            alignItems="center"
            gap="$5">
            <Text>Login Screen</Text>
            <H1>Test Header</H1>
            <H2>Test Header</H2>
            <H3>Test Header</H3>

            <Link
                href="/home"
                replace
                asChild>
                <Button theme="active">Login</Button>
            </Link>

            <Button>Test button</Button>
        </Screen>
    );
}

export default LoginScreen;
