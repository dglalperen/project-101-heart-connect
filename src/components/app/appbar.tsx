import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import tamaguiConfig from '@src/tamagui';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { Text, XStack, useTheme } from 'tamagui';

import Button from '../button';

function AppBar(props: NativeStackHeaderProps) {
    const theme = useTheme();
    const { height: screenHeight } = useWindowDimensions();

    return (
        <SafeAreaView style={{ backgroundColor: theme.background.val, height: screenHeight * 0.1 }}>
            <XStack
                p="$3"
                alignItems="center">
                {props.back && (
                    <Button
                        onPress={props.navigation.goBack}
                        h="$5"
                        alignSelf="flex-start"
                        outlined>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={25}
                            color={tamaguiConfig.tokens.color.primary.val}
                        />
                    </Button>
                )}

                <XStack mx="auto">
                    <Text
                        fontWeight="bold"
                        fontSize="$9">
                        {props.options.title}
                    </Text>
                </XStack>

                {props.options?.headerRight &&
                    props.options?.headerRight({
                        canGoBack: props.navigation.canGoBack(),
                    })}
            </XStack>
        </SafeAreaView>
    );
}

export default AppBar;
