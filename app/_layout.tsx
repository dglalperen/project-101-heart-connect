import AppBar from '@src/components/app/appbar';
import useSession from '@src/hooks/session';
import useFontsLoader from '@src/hooks/use-fonts-loader';
import Providers from '@src/providers';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

export const unstable_settings = {
    initialRouteName: '',
};

SplashScreen.preventAutoHideAsync();

function RootLayout() {
    const loaded = useFontsLoader();
    const { initialized } = useSession();

    useEffect(() => {
        if (loaded && initialized) {
            SplashScreen.hideAsync();
        }
    }, [loaded, initialized]);

    if (!loaded) {
        return null;
    }

    return (
        <Providers>
            <Stack
                screenOptions={{
                    header(props) {
                        return <AppBar {...props} />;
                    },
                }}
            />
        </Providers>
    );
}

export default RootLayout;
