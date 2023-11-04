import {
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

function useFontsLoader() {
    const [loaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    return loaded;
}

export default useFontsLoader;
