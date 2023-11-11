import useSession from '@src/hooks/session';
import { Redirect } from 'expo-router';
import React from 'react';

function RootScreen() {
<<<<<<< HEAD
    return <Redirect href="/signup" />;
=======
    const { isLoggedIn } = useSession();

    if (!isLoggedIn) {
        return <Redirect href="/signup" />;
    }

    return <Redirect href="/login" />;
>>>>>>> origin
}

export default RootScreen;
