import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '@src/components/button';
import Screen from '@src/components/screen';
import tamaguiConfig from '@src/tamagui';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { H1, Paragraph, View } from 'tamagui';

interface IPassion {
    name: string;
    icon: (iconColor?: string) => React.ReactNode;
}

// TODO: fetch it from database
const passions: IPassion[] = [
    {
        icon: (iconColor?: string) => (
            <MaterialCommunityIcons
                name="camera"
                size={20}
                color={iconColor ?? tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Photography',
    },
    {
        icon: (iconColor?: string) => (
            <MaterialCommunityIcons
                name="shopping"
                size={20}
                color={iconColor ?? tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Shopping',
    },
    {
        icon: (iconColor?: string) => (
            <MaterialCommunityIcons
                size={20}
                name="microphone"
                color={iconColor ?? tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Karaoke',
    },
    {
        icon: (iconColor?: string) => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={iconColor ?? tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: (iconColor?: string) => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={iconColor ?? tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: (iconColor?: string) => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={iconColor ?? tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: (iconColor?: string) => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={iconColor ?? tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: (iconColor?: string) => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={iconColor ?? tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: (iconColor?: string) => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={iconColor ?? tamaguiConfig.tokens.color.primary.val}
            />
        ),
        name: 'Yoga',
    },
    {
        icon: (iconColor?: string) => (
            <MaterialCommunityIcons
                name="tab"
                size={20}
                color={iconColor ?? tamaguiConfig.tokens.color.primary.val}
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

    const renderItem = useCallback(
        ({ item }: { item: IPassion }) => {
            const isActive = selectedPassions.includes(item);

            return (
                <Button
                    key={item.name}
                    icon={() => item.icon(isActive ? '#fff' : undefined)}
                    w="$size.12"
                    h="$size.5"
                    mr="$5"
                    borderColor="$gray5Light"
                    theme={selectedPassions.includes(item) ? 'active' : undefined}
                    onPress={() => onSelectPassion(item)}>
                    {item.name}
                </Button>
            );
        },
        [selectedPassions],
    );

    return (
        <Screen
            p="$5"
            justifyContent="center"
            space="$10">
            <View>
                <H1>Your interests</H1>
                <Paragraph>
                    Select a few of your interests and let everyone know what you’re passionate
                    about.
                </Paragraph>
            </View>
            <FlatList
                data={passions}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{
                    gap: 15,
                    flex: 1,
                    alignItems: 'center',
                }}
            />

            <Button
                theme="active"
                w="100%"
                h="$7">
                Continue
            </Button>
        </Screen>
    );
}

export default PassionsScreen;
