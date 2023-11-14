import { MaterialCommunityIcons } from '@expo/vector-icons';
import Sheet from '@src/components/app/sheet';
import Button from '@src/components/button';
import DividerWithText from '@src/components/divider';
import Screen from '@src/components/screen';
import RegisterForm from '@src/modules/auth-module/components/register-form';
import tamaguiConfig from '@src/tamagui';
import Assets from '@src/theme/assets';
import { Link, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { H3, H5, Image, View, XStack, YStack } from 'tamagui';

function SignupScreen() {
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

    const onPressContinueEmail = useCallback(() => {
        setIsSheetOpen(v => !v);
    }, []);

    const onSuccessfulSignUp = useCallback(() => {
        setIsSheetOpen(false);

        router.replace('/(app)/home/account');
    }, []);

    const onError = useCallback((error: unknown) => {
        console.error(error);
    }, []);

    return (
        <Screen
            justifyContent="center"
            alignItems="center"
            space>
            <Image
                source={Assets.Logo()}
                width={110}
                height={100}
                mb="$10"
            />

            <H5
                fontWeight="bold"
                mb="$5">
                Sign up to continue
            </H5>

            <YStack>
                <YStack space>
                    <Button
                        theme="active"
                        width="$20"
                        onPress={onPressContinueEmail}
                        height="$4.5">
                        Continue with email
                    </Button>
                    <Link
                        href="/onboarding"
                        asChild>
                        <Button
                            outlined
                            width="$20"
                            height="$4.5"
                            fontWeight="600"
                            fontSize="$5">
                            Use phone number
                        </Button>
                    </Link>
                </YStack>

                <YStack mt="$10">
                    <DividerWithText>or sign up with</DividerWithText>

                    <XStack
                        justifyContent="space-evenly"
                        mt="$5">
                        <Button
                            outlined
                            w="$size.6"
                            h="$size.6">
                            <MaterialCommunityIcons
                                name="facebook"
                                size={28}
                                color={tamaguiConfig.tokens.color.primary.val}
                            />
                        </Button>

                        <Button
                            outlined
                            w="$size.6"
                            h="$size.6">
                            <MaterialCommunityIcons
                                name="google"
                                size={28}
                                color={tamaguiConfig.tokens.color.primary.val}
                            />
                        </Button>

                        <Button
                            outlined
                            w="$size.6"
                            h="$size.6">
                            <MaterialCommunityIcons
                                name="apple"
                                size={28}
                                color={tamaguiConfig.tokens.color.primary.val}
                            />
                        </Button>
                    </XStack>
                </YStack>
                <XStack
                    justifyContent="space-evenly"
                    mt="$10">
                    <Button isText>Terms of use</Button>
                    <Button isText>Privacy Policy</Button>
                </XStack>
            </YStack>

            <Sheet
                snapPoints={[40]}
                open={isSheetOpen}>
                <View
                    flex={1}
                    space>
                    <H3>Sign up</H3>
                    <RegisterForm
                        onSuccessfulSignUp={onSuccessfulSignUp}
                        onError={onError}
                    />
                </View>
            </Sheet>
        </Screen>
    );
}

export default SignupScreen;
