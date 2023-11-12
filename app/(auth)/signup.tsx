import { MaterialCommunityIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import Button from '@src/components/button';
import DividerWithText from '@src/components/divider';
import Screen from '@src/components/screen';
import useSession from '@src/hooks/session';
import tamaguiConfig from '@src/tamagui';
import Assets from '@src/theme/assets';
import { Link, router } from 'expo-router';
import { useCallback } from 'react';
import { H5, Image, SizableText, XStack, YStack } from 'tamagui';

function SignupScreen() {
    const { currentUser, isLoggedIn } = useSession();
    const onPressContinueEmail = useCallback(() => {
        console.clear();
        console.log('onPressContinueEmail');
        console.log('Signing in with email and password');

        if (isLoggedIn) {
            console.warn('User is already logged in. Signing out...');
            auth().signOut();

            return;
        }

        try {
            // Attempt to sign in with the specified credentials
            // Uncomment the desired account for sign-in
            //auth().signInWithEmailAndPassword('test@test.com', 'test123');
            auth().signInWithEmailAndPassword('admin@admin.com', 'admin123');
        } catch (error) {
            // Log any errors that occur during sign-in
            console.error('Error during sign-in:', error);
        }
    }, [isLoggedIn]);

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

            <SizableText>User email: {currentUser?.email}</SizableText>
            <SizableText>Is logged in:{isLoggedIn.toString()}</SizableText>

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
                        href="/login"
                        asChild>
                        <Button
                            outlined
                            width="$20"
                            height="$4.5"
                            fontWeight="600"
                            fontSize="$5"
                            onPress={() => router.push('/app/home/account')}>
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
        </Screen>
    );
}

export default SignupScreen;
