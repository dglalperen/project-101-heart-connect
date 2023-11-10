import * as Clipboard from 'expo-clipboard';
import { useEffect } from 'react';

interface IProps {
    pinCount: number;
    updateOtpState: (otpValue: string[]) => void;
}

function useOtpClipboard(props: IProps) {
    useEffect(() => {
        const clipboardListener = Clipboard.addClipboardListener(async e => {
            if (!e.contentTypes.includes(Clipboard.ContentType.PLAIN_TEXT)) {
                return;
            }

            const regexp = new RegExp(`^\\d{${props.pinCount}}$`);

            const content = await Clipboard.getStringAsync();

            const ifIsPin = regexp.test(content);

            if (ifIsPin) {
                props.updateOtpState(content.split(''));
            }
        });

        return () => {
            clipboardListener.remove();
        };
    }, []);
}

export default useOtpClipboard;
