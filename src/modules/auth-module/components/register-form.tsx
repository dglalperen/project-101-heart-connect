import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@src/components/button';
import useSession from '@src/hooks/session';
import { useToastController } from '@tamagui/toast';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input, Label, Text, View, XStack, YStack, styled } from 'tamagui';
import { z } from 'zod';

type FormData = {
    email: string;
    password: string;
};

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const ErrorText = styled(Text, {
    color: 'red',
});

interface IProps {
    onSuccessfullSignUp: () => void;
}

function RegisterForm({ onSuccessfullSignUp }: IProps) {
    const { signUp } = useSession();
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
        resolver: zodResolver(schema),
    });
    const toastController = useToastController();

    const onSubmit = useCallback(
        async (data: FormData) => {
            if (isValid) {
                try {
                    await signUp(data.email, data.password);
                    onSuccessfullSignUp();
                    toastController.show('Signed up successfully!', {
                        toastType: 'success',
                    });
                } catch (error) {
                    console.error(error);
                    toastController.show('Could not sign up! Please try again later', {
                        toastType: 'error',
                    });
                }
            }
        },
        [isValid, signUp, toastController, onSuccessfullSignUp],
    );

    return (
        <View
            flex={1}
            space
            justifyContent="space-between">
            <View gap="$5">
                <YStack space>
                    <XStack
                        alignItems="center"
                        space="$4">
                        <Label htmlFor="email">Email</Label>

                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <Input
                                    flex={1}
                                    id="email"
                                    autoCapitalize="none"
                                    placeholder="Email"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </XStack>
                    {errors.email ? <ErrorText>{errors.email.message}</ErrorText> : null}
                </YStack>
                <YStack space>
                    <XStack
                        alignItems="center"
                        space="$4">
                        <Label htmlFor="password">Password</Label>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <Input
                                    flex={1}
                                    id="password"
                                    placeholder="Password"
                                    secureTextEntry
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </XStack>
                    {errors.password ? <ErrorText>{errors.password.message}</ErrorText> : null}
                </YStack>
            </View>

            <Button
                theme="active"
                onPress={handleSubmit(onSubmit)}>
                Sign up
            </Button>
        </View>
    );
}

export default RegisterForm;
