import Button from '@src/components/button';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image } from 'tamagui';

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
            <Button
                theme="active"
                w="$10"
                h="$10"
                borderRadius={20}
                onPress={pickImage}>
                {image && (
                    <Image
                        source={{ uri: image }}
                        width="$10"
                        height="$10"
                        borderRadius={20}
                    />
                )}
            </Button>
        </>
    );
}
