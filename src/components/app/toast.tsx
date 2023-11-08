import { Toast as IToast, useToastState } from '@tamagui/toast';
import { useMemo } from 'react';
import { YStack } from 'tamagui';

const Toast = () => {
    const currentToast = useToastState();
    const toastBgColor = useMemo(() => {
        switch (currentToast?.toastType) {
            case 'error':
                return 'red';
            case 'success':
                return 'green';
            case 'warning':
                return 'orange';

            default:
                return 'blue';
        }
    }, [currentToast]);

    if (!currentToast || currentToast.isHandledNatively) return null;
    return (
        <IToast
            key={currentToast.id}
            duration={currentToast.duration}
            enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
            exitStyle={{ opacity: 0, scale: 1, y: -20 }}
            y={0}
            opacity={1}
            scale={1}
            animation="quick"
            viewportName={currentToast.viewportName}
            bg={toastBgColor}>
            <YStack>
                <IToast.Title color="white">{currentToast.title}</IToast.Title>
                {!!currentToast.message && (
                    <IToast.Description color="white">{currentToast.message}</IToast.Description>
                )}
            </YStack>
        </IToast>
    );
};

export default Toast;
