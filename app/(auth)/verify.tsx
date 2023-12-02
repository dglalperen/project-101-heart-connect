import Button from '@src/components/button';
import OtpInput from '@src/components/otp-input';
import Screen from '@src/components/screen';
import useCountdownTimer from '@src/hooks/countdown-timer';
import useSession from '@src/hooks/session';
import React, { useState } from 'react';
import { H2, Paragraph } from 'tamagui';

function VerifyScreen() {
    const { secondsToDate } = useCountdownTimer();
    const { confirmCode } = useSession();
    const [otp, setOtp] = useState<string>('');

    const handleConfirmOtp = async () => {
        await confirmCode(otp);
    };

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
            <OtpInput length={6} />
            <Button
                onPress={handleConfirmOtp}
                isText>
                Confirm OTP
            </Button>

            <Button
                onPress={() => console.log('send again')}
                isText>
                Send again
            </Button>
        </Screen>
    );
}

export default VerifyScreen;
