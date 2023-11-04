import fonts from '@src/tamagui/fonts';
import themes from '@src/tamagui/themes';
import tokens from '@src/tamagui/tokens';
import { config } from '@tamagui/config/v2-native';
import { createTamagui } from 'tamagui';

const tamaguiConfig = createTamagui({
    ...config,
    fonts: {
        heading: fonts.headingFont,
        body: fonts.bodyFont,
    },
    themes,
    tokens,
});

export type AppConfig = typeof tamaguiConfig;
export default tamaguiConfig;
