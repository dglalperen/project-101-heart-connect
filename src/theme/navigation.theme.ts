import { Theme } from '@react-navigation/native';
import tamaguiConfig from '@src/tamagui';

// TODO: Primary color should be changed in future

export const AppNavigationDarkTheme: Theme = {
    dark: true,
    colors: {
        background: tamaguiConfig.themes.dark.background.val,
        card: tamaguiConfig.themes.dark.backgroundFocus.val,
        border: tamaguiConfig.themes.dark.borderColor.val,
        primary: tamaguiConfig.themes.dark.primary.val,
        notification: tamaguiConfig.themes.dark.background.val,
        text: tamaguiConfig.themes.dark.color.val,
    },
};

export const AppNavigationTheme: Theme = {
    dark: false,
    colors: {
        background: tamaguiConfig.themes.light.background.val,
        card: tamaguiConfig.themes.light.backgroundFocus.val,
        border: tamaguiConfig.themes.light.borderColor.val,
        primary: tamaguiConfig.themes.light.primary.val,
        notification: tamaguiConfig.themes.light.background.val,
        text: tamaguiConfig.themes.light.color.val,
    },
};
