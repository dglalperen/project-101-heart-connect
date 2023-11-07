import { useEffect, useMemo, useState } from 'react';

export enum CountdownTimerSeconds {
    FiveMinutes = 300,
    TenMinutes = 600,
}

export interface ICountdownProps {
    seconds?: CountdownTimerSeconds;
}

function useCountdownTimer(props?: ICountdownProps) {
    const [seconds, setSeconds] = useState<CountdownTimerSeconds>(
        props?.seconds ?? CountdownTimerSeconds.FiveMinutes,
    );

    const secondsToDate = useMemo(() => {
        return new Intl.DateTimeFormat('en-US', {
            minute: '2-digit',
            second: '2-digit',
        }).format(new Date(seconds * 1000));
    }, [seconds]);

    useEffect(() => {
        const timer = seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [seconds]);

    return {
        secondsToDate,
    };
}

export default useCountdownTimer;
