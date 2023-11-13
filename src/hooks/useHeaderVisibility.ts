import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

export function useHeaderVisibility(visible = true) {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: visible,
        });
    }, [navigation, visible]);
}
