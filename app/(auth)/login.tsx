import Screen from '@src/components/screen';
import { Link } from 'expo-router';
import React from 'react';
import { Button, Text } from 'tamagui';

function LoginScreen() {
    return (
        <Screen
            justifyContent="center"
            alignItems="center"
            gap="$5">
            <Text>Login Screen</Text>
            <Link
                href="/home"
                replace
                asChild>
                <Button theme="active">Login</Button>
            </Link>
        </Screen>
    );
}

export default LoginScreen;
