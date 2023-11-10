import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '@src/components/button';
import tamaguiConfig from '@src/tamagui';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, XStack, YStack } from 'tamagui';

export default function ImagePickerExample() {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <>
            <XStack>
                <Image
                    source={{
                        uri: image
                            ? image
                            : 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg',
                    }}
                    width="$10"
                    height="$10"
                    borderRadius={20}
                    onPress={pickImage}
                />
                <YStack
                    backgroundColor={tamaguiConfig.tokens.color.primary.val}
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
