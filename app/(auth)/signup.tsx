import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '@src/components/button';
import DividerWithText from '@src/components/divider';
import Screen from '@src/components/screen';
import tamaguiConfig from '@src/tamagui';
import Assets from '@src/theme/assets';
import { Link } from 'expo-router';
import { H5, Image, XStack, YStack } from 'tamagui';

function SignupScreen() {
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

                        <Link
                            href="/basic-profile"
                            asChild>
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
                        </Link>

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
