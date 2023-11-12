import auth from '@react-native-firebase/auth';
import Screen from '@src/components/screen';
import useSession from '@src/hooks/session';

import { Link } from 'expo-router';
import React, { useCallback } from 'react';
import { Button, Text } from 'tamagui';

function AccountScreen() {
    const onPressLogout = useCallback(() => {
        console.log('Signing out');

        auth().signOut();
    }, []);

    return (
        <Screen
            justifyContent="center"
            alignItems="center"
            gap="$5">
            <Text>Account Screen</Text>
            <Link
                href="/signup"
                asChild
                replace>
                <Button
                    onPress={onPressLogout}
                    theme="active">
                    Logout
                </Button>
            </Link>
        </Screen>
    );
}

export default AccountScreen;
