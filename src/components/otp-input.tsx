import { useCallback, useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData } from 'react-native';
import { Input, XStack, styled } from 'tamagui';

interface IOtpInputs {
    length?: number;
}

const OtpTextField = styled(Input, {
    width: 70,
    height: 70,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: '$9',

    variants: {
        isFilled: {
            true: {
                bg: '$primary',
                color: 'white',
            },
            false: {
                borderColor: '$border',
                placeholderTextColor: '$border',
            },
        },
    },
});

function OtpInput(props: IOtpInputs) {
    const [otp, setOtp] = useState<string[]>(new Array(props?.length ?? 4).fill(''));
    const inputs = useRef<TextInput[]>([]);
    const currentInputIndex = useRef<number>();

    useEffect(() => {
        if (otp[otp.length - 1] !== '') {
            alert("You're verified successfully.");
        }
    }, [otp]);

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next box if the current one has a value
        if (value && index < newOtp.length - 1) {
            currentInputIndex.current = index + 1;
            focusNextInput(index + 1);
        }

        // Move focus to the previous box if the current one has no value
        if (!value && index < newOtp.length + 1) {
            currentInputIndex.current = index - 1;
            focusPrevInput(index - 1);
        }
    };

    const focusPrevInput = useCallback(
        (index?: number) => {
            const prevIndex = currentInputIndex.current! - 1;
            const prevInput = inputs.current[index ?? prevIndex];

            if (prevInput) {
                currentInputIndex.current = prevIndex;
            }

            prevInput?.focus();
        },
        [currentInputIndex],
    );

    const focusNextInput = useCallback(
        (index?: number) => {
            const nextIndex = currentInputIndex.current! + 1;
            const nextInput = inputs.current[index ?? nextIndex];
            nextInput?.focus();
        },
        [currentInputIndex],
    );

    const onKeyPress = useCallback(
        (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
            if (e.nativeEvent.key === 'Backspace') {
                if (otp[currentInputIndex.current!] === '') {
                    focusPrevInput();
                }
            }
        },
        [otp],
    );

    return (
        <XStack space>
            {otp.map((digit, index) => (
                <OtpTextField
                    key={index}
                    maxLength={1}
                    isFilled={otp[index] !== ''}
                    keyboardType="numeric"
                    onChangeText={value => handleOtpChange(value, index)}
                    value={digit}
                    autoComplete="sms-otp"
                    textContentType="oneTimeCode"
                    placeholder="0"
                    onKeyPress={onKeyPress}
                    caretHidden
                    ref={input => {
                        if (input) {
                            inputs.current[index] = input;
                        }
                    }}
                />
            ))}
        </XStack>
    );
}

export default OtpInput;
