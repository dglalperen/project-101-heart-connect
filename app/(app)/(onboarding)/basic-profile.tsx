import Button from '@src/components/button';
import { DatePicker } from '@src/components/date-picker';
import ImagePickerExample from '@src/components/image-picker';
import Screen from '@src/components/screen';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { H1, H2, Input, XStack, YStack } from 'tamagui';

function BasicProfileScreen() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmDisabled, setConfirmDisabled] = useState(true);
    const [date, setDate] = useState<Date | undefined>();

    useEffect(() => {
        if (!date) {
            return;
        }

        const newDate = new Date();
        const ageLimitDate = subYears(newDate, 18);

        if (firstName !== '' && lastName !== '' && ageLimitDate >= date) {
            setConfirmDisabled(false);
        } else if (firstName === '' || lastName === '' || ageLimitDate < date) {
            // add toast to notify user that first name or last name is empty
            // add toast if the user is not 18 years old based on the date entered
            setConfirmDisabled(true);
        }
    }, [firstName, lastName, date]);

    // Helper function to subtract years from Date
    // Can be moved to a separate helper file or something
    const subYears = (date: Date, years: number) => {
        const dateCopy = new Date(date);
        dateCopy.setFullYear(dateCopy.getFullYear() - years);
        return dateCopy;
    };

    const onConfirm = () => {
        router.push('/gender');
    };

    // Callback function to get the selected date from date-picker
    const getDate = (date: Date) => {
        setDate(date);
    };

    return (
        <Screen mx="$7">
            <YStack h="$10" />
            <H2>Profile Details</H2>
            <YStack h="$10" />
            <YStack>
                <XStack
                    justifyContent="center"
                    alignItems="center"
                    mb="$10">
                    <ImagePickerExample />
                </XStack>
                <YStack mb="$14">
                    <Input
                        mb="$4"
                        height="$5"
                        placeholder="First Name"
                        defaultValue={firstName}
                        onChangeText={newText => setFirstName(newText)}
                    />
                    <Input
                        mb="$4"
                        height="$5"
                        placeholder="Last Name"
                        defaultValue={lastName}
                        onChangeText={newText => setLastName(newText)}
                    />

                    <DatePicker getDate={getDate} />
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
