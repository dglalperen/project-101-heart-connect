import { zodResolver } from '@hookform/resolvers/zod';
import Firestore from '@react-native-firebase/firestore';
import Button from '@src/components/button';
import { Collections } from '@src/firebase/models';
import { IUser } from '@src/firebase/models/user.model';
import useCollection from '@src/hooks/firebase/useCollection';
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
    onSuccessfulSignUp: () => void;
    onError: (error: string) => void;
}

function RegisterForm({ onSuccessfulSignUp }: IProps) {
    const { signUp } = useSession();
    const { createWithDocRef } = useCollection<IUser>(Collections.Users);
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
                    const user = await signUp(data.email, data.password);
                    await createWithDocRef(user.user.uid, {
                        birthdate: Firestore.Timestamp.now(),
                        firstName: '',
                        gender: '',
                        interests: [],
                        lastName: '',
                        profileImageRef: '',
                        userId: user.user.uid,
                    });

                    onSuccessfulSignUp();
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
        [isValid, signUp, createWithDocRef, onSuccessfulSignUp, toastController],
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
