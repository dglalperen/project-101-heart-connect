import { ThemeProvider } from '@react-navigation/native';
import React, { PropsWithChildren, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';

import tamaguiConfig from './tamagui';
import { AppNavigationDarkTheme, AppNavigationTheme } from './theme/navigation.theme';

function Providers({ children }: PropsWithChildren) {
    const activeTheme = useColorScheme();
    const navigationTheme = useMemo(
        () => (activeTheme === 'dark' ? AppNavigationDarkTheme : AppNavigationTheme),
        [activeTheme],
    );

    return (
        <TamaguiProvider config={tamaguiConfig}>
            <Theme name={activeTheme}>
                <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>
            </Theme>
        </TamaguiProvider>
    );
}

export default Providers;
