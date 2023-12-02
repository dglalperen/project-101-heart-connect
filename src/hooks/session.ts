import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';

function useSession() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [initialized, setInitialized] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
    const [code, setCode] = useState<string>('');

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

    const signUp = useCallback(async (email: string, password: string) => {
        return await auth().createUserWithEmailAndPassword(email, password);
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        return await auth().signInWithEmailAndPassword(email, password);
    }, []);

    const signInWithPhoneNumber = useCallback(async (phoneNumber: string) => {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }, []);

    const confirmCode = useCallback(
        async (otp: string) => {
            if (!confirm) {
                console.log('No confirmation code available');
                return;
            }

            try {
                await confirm.confirm(otp);
            } catch (error) {
                console.log('Invalid code.', error);
            }
        },
        [confirm],
    );

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(e => onAuthStateChanged(e));

        return subscriber;
    }, [isLoggedIn, onAuthStateChanged]);

    return {
        isLoggedIn,
        currentUser,
        initialized,
        signUp,
        signIn,
        signInWithPhoneNumber,
        confirmCode,
    };
}

export default useSession;
