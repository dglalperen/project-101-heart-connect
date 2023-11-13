import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IMessage {
    messageId: string;
    message: string;
    receiverId: string;
    senderId: string;
    timestamp: FirebaseFirestoreTypes.Timestamp;
}