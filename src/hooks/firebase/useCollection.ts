import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Collections } from '@src/firebase/models';
import { useCallback, useMemo } from 'react';

function useCollection<T extends FirebaseFirestoreTypes.DocumentData>(_collection: Collections) {
    const collection = useMemo(
        () => firestore().collection(_collection) as FirebaseFirestoreTypes.CollectionReference<T>,
        [_collection],
    );

    const getByDoc = useCallback(
        async (docPath: string) => {
            const query = await collection.doc(docPath).get();
            if (query.exists) {
                return query.data();
            } else {
                throw new Error(`Document with path ${docPath} does not exist.`);
            }
        },
        [collection],
    );

    const create = useCallback(
        async (data: T) => {
            try {
                const query = await collection.add(data);

                return { id: query.id, ...data };
            } catch (error) {
                console.error(`Failed to create document: `, error);
                throw error;
            }
        },
        [collection],
    );

    const getSubCollection = useCallback(
        async (parentDocPath: string, subCollectionName: string) => {
            try {
                const subCollectionRef = collection
                    .doc(parentDocPath)
                    .collection(subCollectionName);
                const querySnapshot = await subCollectionRef.get();
                return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error(
                    `Failed to fetch subcollection ${subCollectionName} from ${parentDocPath}: `,
                    error,
                );
                throw error;
            }
        },
        [collection],
    );

    const update = useCallback(
        async (
            docPath: string,
            data: Partial<FirebaseFirestoreTypes.SetValue<T>>,
        ): Promise<void> => {
            try {
                return collection.doc(docPath).update(data);
            } catch (error) {
                console.error(`Failed to update document at ${docPath}: `, error);
                throw error;
            }
        },
        [collection],
    );

    return {
        getByDoc,
        update,
        create,
        collection,
        getSubCollection,
    };
}

export default useCollection;
