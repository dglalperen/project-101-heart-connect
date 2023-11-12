import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IMatch {
    matchId: string;
    userIds: string[];
    timestamp: FirebaseFirestoreTypes.Timestamp;
}
