import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '@src/components/button';
import Screen from '@src/components/screen';
import tamaguiConfig from '@src/tamagui';
import { useCallback, useState } from 'react';
import { H1, Paragraph, XStack } from 'tamagui';

interface IPassion {
    name: string;
    icon: () => React.ReactNode;
}

const passions: IPassion[] = [
    {
        icon: () => (
            <MaterialCommunityIcons
                name="camera"
                size={20}
                color={tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Photography',
    },
    {
        icon: () => (
            <MaterialCommunityIcons
                name="shopping"
                size={20}
                color={tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Shopping',
    },
    {
        icon: () => (
            <MaterialCommunityIcons
                size={20}
                name="microphone"
                color={tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Karaoke',
    },
    {
        icon: () => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: () => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: () => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: () => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: () => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: () => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: () => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
];

function PassionsScreen() {
    const [selectedPassions, setSelectedPassions] = useState<IPassion[]>([]);

    const onSelectPassion = useCallback(
        (passion: IPassion) => {
            if (selectedPassions.includes(passion)) {
                setSelectedPassions(passions => passions.filter(p => p.name !== passion.name));

                return;
            }

            setSelectedPassions(passions => [...passions, passion]);
        },
        [selectedPassions],
    );

    return (
        <Screen
            p="$5"
            justifyContent="center">
            <H1>Your interests</H1>
            <Paragraph>
                Select a few of your interests and let everyone know what you’re passionate about.
            </Paragraph>

            <XStack
                flexWrap="wrap"
                alignSelf="center"
                gap="$3">
                {passions.map(passion => (
                    <Button
                        key={passion.name}
                        icon={passion.icon}
                        w="$size.12"
                        h="$size.5"
                        borderColor="$gray5Light"
                        theme={selectedPassions.includes(passion) ? 'active' : undefined}
                        onPress={() => onSelectPassion(passion)}>
                        {passion.name}
                    </Button>
                ))}
            </XStack>

            <Button
                theme="active"
                w="100%">
                Continue
            </Button>
        </Screen>
    );
}

export default PassionsScreen;
