import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@src/components/button';
import tamaguiConfig from '@src/tamagui';
import { useState } from 'react';
import { Platform } from 'react-native';
import { H5, Sheet, YStack, Text } from 'tamagui';

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
                secondary
                h="$5"
                icon={
                    <MaterialCommunityIcons
                        size={27}
                        name="calendar"
                    />
                }
                onPress={showDatepicker}>
                <Text
                    color={tamaguiConfig.tokens.color.primary.val}
                    fontWeight="bold"
                    fontSize={14}>
                    {displayDate ? displayDate : 'Choose birthday day'}
                </Text>
            </Button>
            {/* {show && Platform.OS === 'android' && ( */}
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
            {/* )} */}
        </>
    );
};
