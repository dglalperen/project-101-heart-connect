import fonts from '@src/tamagui/fonts';
import themes from '@src/tamagui/themes';
import { config } from '@tamagui/config/v2-native';
import { tokens } from '@tamagui/themes';
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
