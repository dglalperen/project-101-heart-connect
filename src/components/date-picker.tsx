import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@src/components/button';
import tamaguiConfig from '@src/tamagui';
import { useState } from 'react';
import { H5, Sheet, YStack, Text } from 'tamagui';

const DEFAULT_DISPLAY_STRING = 'Choose birthday day';

type Props = {
    getDate: (date: Date) => void;
};

export const DatePicker = ({ getDate }: Props) => {
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
        getDate(date);
    };

    return (
        <>
            <Button
                isSecondary
                h="$5"
                icon={
                    <MaterialCommunityIcons
                        size={27}
                        name="calendar"
                    />
                }
                onPress={showDatepicker}>
                <Text
                    color="$primary"
                    fontWeight="bold">
                    {displayDate ? displayDate : DEFAULT_DISPLAY_STRING}
                </Text>
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
