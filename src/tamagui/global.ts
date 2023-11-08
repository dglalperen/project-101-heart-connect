import { AppConfig } from '@src/tamagui/config';

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {}
}

declare module '@tamagui/toast' {
    interface CustomData {
        toastType?: 'error' | 'success' | 'warning';
    }
}
