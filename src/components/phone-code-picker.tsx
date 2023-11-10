import { MaterialCommunityIcons } from '@expo/vector-icons';
import CountryPickerSheet, { Country, fetchCountry } from '@src/components/country-picker-sheet';
import customToken from '@src/tamagui/tokens';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { XStack, SizableText, Button, useTheme } from 'tamagui';

type PhoneCodePickerProps = {
    onChangePhoneCode: (phoneCode: string) => void;
    phoneCode: string;
};

function PhoneCodePicker(props: PhoneCodePickerProps) {
    const { onChangePhoneCode, phoneCode } = props;
    const theme = useTheme();
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [open, setOpen] = useState(false);
    const mounted = useRef(false);

    const openSheet = useCallback(() => {
        setOpen(true);
    }, []);

    const closeSheet = useCallback(() => {
        setOpen(false);
    }, []);

    useEffect(() => {
        (async () => {
            // Will be adding logic to get the current phoneCode based on locale of device
            if (!mounted.current) {
                const country = await fetchCountry(phoneCode ?? '+1');
                if (country) {
                    setSelectedCountry(country);
                    onChangePhoneCode(country.phone_code);
                }
            }
            mounted.current = true;
        })();
    }, [phoneCode]);

    return (
        <>
            <Button
                bg="$backgroundTransparent"
                br={12}
                px="$3"
                mx={3}
                onPress={openSheet}>
                <XStack ai="center">
                    <SizableText textAlign="center">
                        {selectedCountry?.flag} ({selectedCountry?.phone_code})
                    </SizableText>
                    <MaterialCommunityIcons
                        size={24}
                        name="chevron-down"
                        color={customToken.color.textPrimary40.val}
                    />
                </XStack>
            </Button>
            <CountryPickerSheet
                open={open}
                onOpenChange={setOpen}
                phoneCode={phoneCode}
                onSelectCountry={country => {
                    onChangePhoneCode(country.phone_code);
                    setSelectedCountry(country);
                    closeSheet();
                }}
            />
        </>
    );
}

export default PhoneCodePicker;
