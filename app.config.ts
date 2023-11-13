import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    name: 'project-101-heart-connect',
    slug: 'project-101-heart-connect',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
        image: './assets/images/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: true,
        bundleIdentifier: 'com.appdevhangout.project101heartconnect',
        googleServicesFile: process.env.GOOGLE_SERVICES_IOS,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/images/adaptive-icon.png',
            backgroundColor: '#ffffff',
        },
        package: 'com.appdevhangout.project101heartconnect',
        googleServicesFile: process.env.GOOGLE_SERVICES_ANDROID_JSON,
    },
    web: {
        bundler: 'metro',
        output: 'static',
        favicon: './assets/images/favicon.png',
    },
    plugins: [
        'expo-router',
        '@react-native-firebase/app',
        '@react-native-firebase/auth',
        [
            'expo-build-properties',
            {
                ios: {
                    useFrameworks: 'static',
                },
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
        tsconfigPaths: true,
    },
    extra: {
        router: {
            origin: false,
        },
        eas: {
            projectId: '45bc4d95-59e2-469d-8522-8d8a2d8798e1',
        },
    },
    owner: 'appdevhangout',
    runtimeVersion: {
        policy: 'appVersion',
    },
    updates: {
        url: 'https://u.expo.dev/45bc4d95-59e2-469d-8522-8d8a2d8798e1',
    },
});
