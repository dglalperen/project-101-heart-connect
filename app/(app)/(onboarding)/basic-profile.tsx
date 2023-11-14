import Button from '@src/components/button';
import { DatePicker } from '@src/components/date-picker';
import ImagePickerExample from '@src/components/image-picker';
import Screen from '@src/components/screen';
import { validateProfileData } from '@src/utils/validation-schemas';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { H2, Input, XStack, YStack, Text } from 'tamagui';
import { ZodIssue } from 'zod';

function BasicProfileScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const [confirmDisabled, setConfirmDisabled] = useState(true);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: undefined,
        photo: '',
    });

    const [errors, setErrors] = useState<ZodIssue[] | null>(null);

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleDateChange = (date: any) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            dateOfBirth: date,
        }));
    };

    useEffect(() => {
        const validationErrors = validateProfileData(formData);
        setErrors(validationErrors);

        setConfirmDisabled(!!validationErrors);
    }, [formData]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => {
                        onSkip(); // Handle the skip action
                    }}
                    >
                    Skip
                </Button>
            ),
        });
    }, [navigation]);

    const onSkip = () => {
        router.push('/gender');
    };

    const onConfirm = () => {
        const validationErrors = validateProfileData(formData);

        if (!validationErrors) {
            router.push('/gender');
        } else {
            setErrors(validationErrors);
            // Handle validation errors (e.g., show a toast or alert)
        }
    };

    return (
        <Screen mx="$7">
            <H2>Profile Details</H2>
            <YStack h="$3" />
            <YStack>
                <XStack
                    justifyContent="center"
                    alignItems="center"
                    mb="$10">
                    <ImagePickerExample
                        onImageSelected={photo => handleInputChange('photo', photo)}
                    />
                </XStack>
                <YStack mb="$3">
                    <Input
                        mb="$4"
                        height="$5"
                        placeholder="First Name"
                        defaultValue={formData.firstName}
                        onChangeText={newText => handleInputChange('firstName', newText)}
                    />
                    <Input
                        mb="$4"
                        height="$5"
                        placeholder="Last Name"
                        defaultValue={formData.lastName}
                        onChangeText={newText => handleInputChange('lastName', newText)}
                    />
                    <DatePicker getDate={handleDateChange} />
                    <YStack
                        pt="$2"
                        height="$12">
                        {errors && (
                            <>
                                {errors.map((error, index) => (
                                    <Text
                                        key={index}
                                        color="red">
                                        {error.message}
                                    </Text>
                                ))}
                            </>
                        )}
                    </YStack>
                </YStack>

                <Button
                    theme="active"
                    onPress={onConfirm}
                    h="$5"
                    disabled={confirmDisabled}
                    opacity={confirmDisabled ? 0.5 : 1}>
                    Confirm
                </Button>
            </YStack>
        </Screen>
    );
}

export default BasicProfileScreen;
