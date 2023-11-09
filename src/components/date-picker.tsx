import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@src/components/button';
import { SetStateAction, useState } from 'react';
import { H5, Sheet, SizableText, XStack, YStack } from 'tamagui';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const DatePicker = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [displayDate, setDisplayDate] = useState<string | null>();
    const [show, setShow] = useState(false);

    const onChange = (_event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setDisplayDate(currentDate.toISOString().slice(0, 10).replace(/-/g, ' - '));
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const closeDatePicker = () => {
        setShow(false);
    };

    return (
        <>
            <Button
                theme="active"
                h="$5"
                // opacity={0.1}
                onPress={showDatepicker}>
                <XStack
                    alignItems="center"
                    flex={1}>
                    <MaterialCommunityIcons
                        size={27}
                        name="calendar"
                    />
                    <H5
                        color="white"
                        fontWeight="bold"
                        fontSize={14}>
                        {displayDate ? displayDate : 'Choose birthday day'}
                    </H5>
                </XStack>
            </Button>

            <Sheet
                modal
                open={show}
                onOpenChange={setShow}
                dismissOnSnapToBottom
                snapPointsMode="constant"
                snapPoints={[575, 200]}
                zIndex={100_000}
                animation="medium">
                <Sheet.Handle />
                <Sheet.Frame
                    paddingTop="$10"
                    alignItems="center">
                    <YStack>
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="inline"
                            onChange={onChange}
                            maximumDate={new Date()}
                        />

                        <Button
                            mt="$11"
                            theme="active"
                            h="$5"
                            onPress={closeDatePicker}>
                            Save
                        </Button>
                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </>
    );
};
