import useSession from '@src/hooks/session';
import { Redirect } from 'expo-router';
import React from 'react';

function RootScreen() {
    console.log('RootScreen');
    const { isLoggedIn, initialized } = useSession();

    // Show loading screen while authentication state is being initialized
    if (!initialized) {
        return <Redirect href="/loading" />;
    }

    // Redirect based on authentication status
    return isLoggedIn ? <Redirect href="/(app)/home/account" /> : <Redirect href="/signup" />;
}

export default RootScreen;
