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
            }
        },
        [collection],
    );

    const create = useCallback(
        async (data: T) => {
            const query = await collection.add(data);

            return getByDoc(query.id);
        },
        [collection, getByDoc],
    );

    const update = useCallback(
        async (
            docPath: string,
            data: Partial<FirebaseFirestoreTypes.SetValue<T>>,
        ): Promise<void> => {
            return collection.doc(docPath).update(data);
        },
        [collection],
    );

    return {
        getByDoc,
        update,
        create,
        collection,
    };
}

export default useCollection;
