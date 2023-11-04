import React, { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { XStack, YStack } from 'tamagui';

type InputWrapperProps = {
    leftElement?: JSX.Element;
    rightElement?: JSX.Element;
    children: (innerElementsDimension: {
        leftElementWidth: number;
        rightElementWidth: number;
    }) => JSX.Element;
};

function InputWrapper(props: InputWrapperProps) {
    const { children, leftElement, rightElement } = props;
    const [leftElementWidth, setLeftElementWidth] = useState(0);
    const [rightElementWidth, setRightElementWidth] = useState(0);

    const onLayout = useCallback(
        (
            {
                nativeEvent: {
                    layout: { width },
                },
            }: LayoutChangeEvent,
            side: 'left' | 'right',
        ) => {
            if (side === 'left') {
                setLeftElementWidth(width);
            } else {
                setRightElementWidth(width);
            }
        },
        [],
    );

    return (
        <XStack>
            {leftElement ? (
                <YStack
                    onLayout={e => onLayout(e, 'left')}
                    h="$5"
                    pos="absolute"
                    zi={1}
                    jc="center">
                    {leftElement}
                </YStack>
            ) : (
                <></>
            )}
            {children({ leftElementWidth, rightElementWidth })}
            {rightElement ? (
                <YStack
                    onLayout={e => onLayout(e, 'right')}
                    h="$5"
                    pos="absolute"
                    zi={1}
                    jc="center">
                    {rightElement}
                </YStack>
            ) : (
                <></>
            )}
        </XStack>
    );
}

export default InputWrapper;
