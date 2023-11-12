import Screen from '@src/components/screen';
import { Collections } from '@src/firebase/models';
import { IUser } from '@src/firebase/models/user.model';
import useCollection from '@src/hooks/firebase/useCollection';
import useSession from '@src/hooks/session';
import React, { useEffect, useState } from 'react';
import { H3 } from 'tamagui';

function MessagesScreen() {
    const { getByDoc } = useCollection(Collections.Users);
    const [user, setUser] = useState<IUser | null | undefined>(null);
    const { currentUser } = useSession();

    useEffect(() => {
        console.log('Fetching user with id:', currentUser?.uid);
        const fetchUser = async () => {
            // Check if the currentUser and its uid are defined
            if (currentUser?.uid) {
                try {
                    const userData = await getByDoc(currentUser.uid); // currentUser.uid is guaranteed to be a string here
                    if (userData) {
                        console.log('User:', userData);
                        setUser(userData as IUser);
                    } else {
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null);
                }
            } else {
                console.warn('No current user found');
                setUser(null);
            }
        };

        fetchUser();
    }, [currentUser, getByDoc]); // Include currentUser in the dependency array

    return (
        <Screen
            justifyContent="center"
            alignItems="center">
            <H3>Messages Screen</H3>
            <H3>user: {user ? user : ''}</H3>
        </Screen>
    );
}

export default MessagesScreen;
