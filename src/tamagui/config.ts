import { config } from '@tamagui/config/v2-native';
import { createTamagui } from 'tamagui';

const tamaguiConfig = createTamagui(config);

export type AppConfig = typeof tamaguiConfig;
export default tamaguiConfig;
