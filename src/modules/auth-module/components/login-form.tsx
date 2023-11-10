import { zodResolver } from '@hookform/resolvers/zod';
import BaseInput from '@src/components/base-input';
import Button from '@src/components/button';
import InputWrapper from '@src/components/input-wrapper';
import PhoneCodePicker from '@src/components/phone-code-picker';
import { PhoneNumberUtil } from 'google-libphonenumber';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { YStack, XStack, Text } from 'tamagui';
import { z } from 'zod';

const phoneUtil = PhoneNumberUtil.getInstance();

const validatePhoneNumber = (value: string) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parse(value.trim()));
    } catch {
        return false;
    }
};

const schema = z.object({
    phoneNumber: z
        .string()
        .refine(value => value.trim().length > 0, { message: 'Phone number is required' }),
    fullPhoneNumber: z.string().refine(validatePhoneNumber, {
        message: 'Phone number is not valid',
    }),
});

function LoginForm() {
    const {
        control,
        watch,
        setValue,
        formState: { errors, isValid },
        trigger,
        handleSubmit,
    } = useForm({
        defaultValues: {
            phoneCode: '+1',
            phoneNumber: '',
            fullPhoneNumber: '',
        },
        mode: 'onChange',
        resolver: zodResolver(schema),
    });
    const errorMessage = errors?.phoneNumber?.message ?? errors?.fullPhoneNumber?.message;
    const mounted = useRef(false);

    useEffect(() => {
        if (mounted.current) {
            setValue('fullPhoneNumber', `${watch('phoneCode')}${watch('phoneNumber')}`);
            trigger('fullPhoneNumber');
        }
        mounted.current = true;
    }, [watch('phoneCode'), watch('phoneNumber')]);

    return (
        <>
            <YStack h="$3" />
            <Controller
                control={control}
                name="fullPhoneNumber"
                render={() => <></>}
            />
            <InputWrapper
                leftElement={
                    <XStack ai="center">
                        <Controller
                            control={control}
                            name="phoneCode"
                            render={({ field }) => (
                                <PhoneCodePicker
                                    phoneCode={field.value}
                                    onChangePhoneCode={field.onChange}
                                />
                            )}
                        />

                        <YStack
                            h={18}
                            w={1}
                            bg="$border"
                            mr="$3"
                        />
                    </XStack>
                }>
                {({ leftElementWidth }) => (
                    <Controller
                        control={control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <BaseInput
                                placeholder="Phone Number"
                                f={1}
                                pl={leftElementWidth}
                                keyboardType="number-pad"
                                {...field}
                                onChangeText={field.onChange}
                            />
                        )}
                    />
                )}
            </InputWrapper>
            {errorMessage ? (
                <Text
                    m="$2"
                    color="red">
                    {errorMessage}
                </Text>
            ) : (
                <></>
            )}
            <YStack h="$3" />
            <Button
                size="$5"
                disabled={!isValid}
                theme="active"
                color="white"
                onPress={handleSubmit(() => {})}>
                Continue
            </Button>
        </>
    );
}

export default LoginForm;
