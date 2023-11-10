import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';

function useSession() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [initialized, setInitialized] = useState<boolean>(false);
    const currentUser = useMemo<FirebaseAuthTypes.User | null>(
        () => auth().currentUser,
        [isLoggedIn],
    );

    const onAuthStateChanged = useCallback(
        (user: FirebaseAuthTypes.User | null) => {
            if (user) {
                setIsLoggedIn(true);
            }

            if (isLoggedIn && !user) {
                setIsLoggedIn(false);
            }

            if (!initialized) {
                setInitialized(true);
            }
        },
        [isLoggedIn, initialized],
    );

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(e => onAuthStateChanged(e));

        return subscriber;
    }, [isLoggedIn]);

    return { isLoggedIn, currentUser, initialized };
}

export default useSession;
