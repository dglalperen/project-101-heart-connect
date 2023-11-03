import { Screen } from '@src/components/screen';
import { Link } from 'expo-router';
import React from 'react';
import { Button, Text } from 'tamagui';

function AccountScreen() {
    return (
        <Screen
            justifyContent="center"
            alignItems="center"
            gap="$5">
            <Text>Account Screen</Text>
            <Link
                href="/login"
                asChild
                replace>
                <Button theme="active">Logout</Button>
            </Link>
        </Screen>
    );
}

export default AccountScreen;
