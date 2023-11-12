import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IUser {
    userId: string;
    firstName: string;
    lastName: string;
    birthdate: FirebaseFirestoreTypes.Timestamp;
    profileImageRef: string;
    gender: string;
    interests: string[];
    location?: FirebaseFirestoreTypes.GeoPoint;
    bio?: string;
    isActive?: boolean;
}
