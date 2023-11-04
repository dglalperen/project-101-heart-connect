import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import InputWrapper from '@src/components/input-wrapper';
import { COUNTRIES, Country } from '@src/utils/helpers';
import React, { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { H3, Input, ListItem, Sheet, SheetProps, Stack, YStack, useTheme } from 'tamagui';

type CountryPickerSheetProps = SheetProps & {
    phoneCode: string;
    onSelectCountry: (country: Country) => void;
};

function CountryPickerSheet(props: CountryPickerSheetProps) {
    const { phoneCode, onSelectCountry } = props;
    const theme = useTheme();
    const { control, watch } = useForm({ defaultValues: { search: '' } });
    const filteredCountries = useMemo(
        () =>
            COUNTRIES.filter(({ name }) =>
                name.toLowerCase().includes(watch('search').toLowerCase()),
            ),
        [watch('search')],
    );

    const renderItem = useCallback<ListRenderItem<Country>>(
        ({ item }) => (
            <ListItem
                title={item.name}
                subTitle={item.phone_code}
                icon={() => <H3>{item.flag}</H3>}
                onPress={() => {
                    onSelectCountry(item);
                }}
                bg={phoneCode === item.phone_code ? '$backgroundFocus' : '$background'}
            />
        ),
        [phoneCode],
    );

    return (
        <Sheet
            modal
            snapPoints={[90]}
            dismissOnSnapToBottom
            {...props}>
            <Sheet.Overlay />
            <Sheet.Handle />
            <Sheet.Frame>
                <Stack m="$3">
                    <Controller
                        control={control}
                        name="search"
                        render={({ field }) => (
                            <InputWrapper
                                leftElement={
                                    <YStack px="$3">
                                        <MaterialCommunityIcons
                                            size={16}
                                            name="magnify"
                                            color={theme.placeholderColor.val}
                                        />
                                    </YStack>
                                }>
                                {({ leftElementWidth }) => (
                                    <Input
                                        placeholder="Search Country"
                                        onChangeText={field.onChange}
                                        autoCapitalize="none"
                                        returnKeyLabel="Search"
                                        returnKeyType="search"
                                        size="$5"
                                        f={1}
                                        pl={leftElementWidth}
                                        {...field}
                                    />
                                )}
                            </InputWrapper>
                        )}
                    />
                </Stack>
                <FlashList
                    data={filteredCountries}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => (
                        <YStack
                            height={1}
                            backgroundColor="lightgrey"
                        />
                    )}
                    estimatedItemSize={60}
                    extraData={phoneCode}
                />
            </Sheet.Frame>
        </Sheet>
    );
}

export default CountryPickerSheet;
