import auth from '@react-native-firebase/auth';
import Screen from '@src/components/screen';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { Button, Text } from 'tamagui';

function AccountScreen() {
    const onPressLogout = useCallback(() => {
        console.log('Signing out');
        router.replace('/signup');
        auth().signOut();
    }, []);

    return (
        <Screen
            justifyContent="center"
            alignItems="center"
            gap="$5">
            <Text>Account Screen</Text>
            <Button
                onPress={onPressLogout}
                theme="active">
                Logout
            </Button>
        </Screen>
    );
}

export default AccountScreen;
