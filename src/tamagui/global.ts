import { AppConfig } from './config';

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {}
}
