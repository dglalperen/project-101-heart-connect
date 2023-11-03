import { AppConfig } from '@src/tamagui/config';

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {}
}
