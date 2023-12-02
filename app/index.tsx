import useSession from '@src/hooks/session';
import { Redirect } from 'expo-router';

import Onboarding from './(auth)/onboarding';

function RootScreen() {
    const { isLoggedIn } = useSession();

    return isLoggedIn ? <Redirect href="/home/discover" /> : <Onboarding />;
}

export default RootScreen;
