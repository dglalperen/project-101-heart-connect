import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PROFILE_PLACEHOLDER } from '@src/utils/constants';
import * as ExpoImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, XStack, YStack } from 'tamagui';

type Props = {
    onImageSelected?: (image: string) => void;
};

export default function ImagePicker({ onImageSelected }: Props) {
    const [image, setImage] = useState<string | undefined>();
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            if (onImageSelected) {
                onImageSelected(result.assets[0].uri);
            }
            setImage(result.assets[0].uri);
        }
    };

    return (
        <>
            <XStack>
                <Image
                    source={{
                        uri: image ? image : PROFILE_PLACEHOLDER,
                    }}
                    width="$10"
                    height="$10"
                    borderRadius={20}
                    onPress={pickImage}
                />
                <YStack
                    backgroundColor="$primary"
                    h="$4"
                    w="$4"
                    borderRadius="$10"
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    borderColor="white"
                    borderWidth="$1"
                    x={73}
                    y={73}>
                    <MaterialCommunityIcons
                        size={24}
                        name="camera"
                        color="white"
                    />
                </YStack>
            </XStack>
        </>
    );
}
