import useSession from '@src/hooks/session';
import { Redirect } from 'expo-router';

import LoadingScreen from './(auth)/loading';

function RootScreen() {
    console.log('RootScreen');
    const { isLoggedIn, initialized } = useSession();

    if (!initialized) {
        return <LoadingScreen />;
    }

    return isLoggedIn ? <Redirect href="/(app)/home/account" /> : <Redirect href="/signup" />;
}

export default RootScreen;
