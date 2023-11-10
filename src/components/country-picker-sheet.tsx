import jsons from '@assets/jsons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import BaseInput from '@src/components/base-input';
import InputWrapper from '@src/components/input-wrapper';
import customToken from '@src/tamagui/tokens';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { H3, ListItem, Sheet, SheetProps, Stack, YStack, useTheme } from 'tamagui';

export type Country = {
    iso: string;
    phone_code: string;
    name: string;
    flag: string;
};

export const fetchCountry = async (phoneCode: string): Promise<Country | null> => {
    const countries = await jsons.countries();
    return countries.default.find((country: Country) => country.phone_code === phoneCode) ?? null;
};

type CountryPickerSheetProps = SheetProps & {
    phoneCode: string;
    onSelectCountry: (country: Country) => void;
};

function CountryPickerSheet(props: CountryPickerSheetProps) {
    const { phoneCode, onSelectCountry, open } = props;
    const theme = useTheme();
    const { control, watch, reset } = useForm({ defaultValues: { search: '' } });
    const [countries, setCountries] = useState<Country[]>([]);
    const filteredCountries = useMemo(
        () =>
            countries.filter(({ name }) =>
                name.toLowerCase().includes(watch('search').toLowerCase()),
            ),
        [watch('search'), countries],
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
                bg={phoneCode === item.phone_code ? '$backgroundHover' : '$background'}
            />
        ),
        [phoneCode],
    );

    useEffect(() => {
        (async () => {
            const fetchedCountries = await jsons.countries();
            setCountries(fetchedCountries.default);
        })();
    }, []);

    useEffect(() => {
        if (!open) {
            reset({ search: '' });
        }
    }, [open]);

    return (
        <Sheet
            modal
            snapPoints={[90]}
            dismissOnSnapToBottom
            open={open}
            {...props}>
            <Sheet.Overlay bg="$backdrop" />
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
                                            size={20}
                                            name="magnify"
                                            color={customToken.color.textPrimary40.val}
                                        />
                                    </YStack>
                                }>
                                {({ leftElementWidth }) => (
                                    <BaseInput
                                        placeholder="Search Country"
                                        onChangeText={field.onChange}
                                        autoCapitalize="none"
                                        returnKeyLabel="Search"
                                        returnKeyType="search"
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
