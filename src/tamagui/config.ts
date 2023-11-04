import fonts from '@src/tamagui/fonts';
import { config } from '@tamagui/config/v2-native';
import { createTamagui } from 'tamagui';

const tamaguiConfig = createTamagui({
    ...config,
    fonts: {
        heading: fonts.headingFont,
        body: fonts.bodyFont,
    },
});

export type AppConfig = typeof tamaguiConfig;
export default tamaguiConfig;
