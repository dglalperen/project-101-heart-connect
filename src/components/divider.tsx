import { PropsWithChildren } from 'react';
import { SizableText, View, XStack } from 'tamagui';

function DividerWithText({ children }: PropsWithChildren) {
    return (
        <XStack alignItems="center">
            <View
                flex={1}
                height={0.5}
                bg="$textPrimary40"
            />
            <SizableText
                px="$4"
                textAlign="center"
                textAlignVertical="center">
                {children}
            </SizableText>
            <View
                flex={1}
                height={0.5}
                bg="$textPrimary40"
            />
        </XStack>
    );
}

export default DividerWithText;
