import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IConversation {
    conversationId: string;
    matchId: string;
    senderId: string;
    receiverId: string;
    timestamp: FirebaseFirestoreTypes.Timestamp;
    message: string;
}
