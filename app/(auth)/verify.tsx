import Button from '@src/components/button';
import OtpInput from '@src/components/otp-input';
import Screen from '@src/components/screen';
import useCountdownTimer from '@src/hooks/countdown-timer';
import React from 'react';
import { H2, Paragraph } from 'tamagui';

function VerifyScreen() {
    const { secondsToDate } = useCountdownTimer();

    return (
        <Screen
            alignItems="center"
            justifyContent="center"
            space>
            <H2 fontWeight="bold">{secondsToDate}</H2>
            <Paragraph
                fontSize="$6"
                color="$textPrimary70"
                lineHeight="$3">
                Type the verification code we’ve sent you
            </Paragraph>

            <OtpInput length={4} />

            <Button isText>Send again</Button>
        </Screen>
    );
}

export default VerifyScreen;
