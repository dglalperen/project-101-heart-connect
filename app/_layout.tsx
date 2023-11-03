import Providers from '@src/providers';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import useFontsLoader from 'src/hooks/use-fonts-loader';

export const unstable_settings = {
    initialRouteName: '',
};

SplashScreen.preventAutoHideAsync();

function RootLayout() {
    const loaded = useFontsLoader();

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Providers>
            <Stack screenOptions={{ headerShown: false }} />
        </Providers>
    );
}

export default RootLayout;
