import useSession from '@src/hooks/session';
import { Redirect } from 'expo-router';
import React from 'react';

function RootScreen() {
    console.log('RootScreen');
    const { isLoggedIn, initialized } = useSession();

    if (!initialized) {
        return <Redirect href="/loading" />;
    }

    return isLoggedIn ? <Redirect href="/(app)/home/account" /> : <Redirect href="/signup" />;
}

export default RootScreen;
