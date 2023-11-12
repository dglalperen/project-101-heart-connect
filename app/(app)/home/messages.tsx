import { FlashList } from '@shopify/flash-list';
import Screen from '@src/components/screen';
import { Collections } from '@src/firebase/models';
import { IMatch } from '@src/firebase/models/match.model';
import { IMessage } from '@src/firebase/models/message.model';
import { IUser } from '@src/firebase/models/user.model';
import useCollection from '@src/hooks/firebase/useCollection';
import useSession from '@src/hooks/session';
import React, { useEffect, useState, useCallback } from 'react';
import { H1, YStack, Button, Text } from 'tamagui';

interface RawMatchData {
    id: string;
    isMatched?: boolean; // Assuming these might be optional in your Firestore data
    lastMessage?: IMessage;
    participants?: string[];
    conversationId?: string;
}

function MessagesScreen() {
    const { getByDoc, getSubCollection } = useCollection(Collections.Users);
    const [user, setUser] = useState<IUser | null>(null);
    const { currentUser } = useSession();
    const [matches, setMatches] = useState<IMatch[] | null>([]);

    useEffect(() => {
        const fetchUserAndMatches = async () => {
            if (currentUser?.uid) {
                try {
                    const userData = await getByDoc(currentUser.uid);
                    setUser(userData as IUser);

                    const rawMatches = (await getSubCollection(
                        currentUser.uid,
                        Collections.Matches,
                    )) as RawMatchData[];
                    const matchesData = rawMatches.map(rawMatch => {
                        return {
                            matchId: rawMatch.id,
                            isMatched: rawMatch.isMatched ?? true,
                            lastMessage: rawMatch.lastMessage ?? null,
                            participants: rawMatch.participants ?? [],
                            conversationId: rawMatch.conversationId ?? null,
                        };
                    });
                    console.log('Matches:', matchesData);
                    setMatches(matchesData as IMatch[]);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchUserAndMatches();
    }, [currentUser, getByDoc, getSubCollection]);

    const openConversationSheet = useCallback((match: IMatch) => {
        console.log(`Open conversation for match: ${match.matchId}`);
    }, []);

    const renderMatch = ({ item }: { item: IMatch }) => (
        <Button onPress={() => openConversationSheet(item)}>
            <YStack>
                <Text>Match ID: {item.lastMessage?.message}</Text>
                {/* Render additional match details here */}
            </YStack>
        </Button>
    );

    return (
        <Screen mx="$7">
            <YStack h="$5" />
            <H1 fontWeight="600">Messages</H1>
            <FlashList
                data={matches}
                renderItem={renderMatch}
                keyExtractor={(item: IMatch) => item.matchId}
                estimatedItemSize={20}
            />
        </Screen>
    );
}

export default MessagesScreen;
