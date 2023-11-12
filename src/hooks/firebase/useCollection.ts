import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Collections } from '@src/firebase/models';
import { useCallback, useMemo } from 'react';

function useCollection<T extends FirebaseFirestoreTypes.DocumentData>(collection: Collections) {
    const _document = useMemo(
        () => firestore().collection(collection) as FirebaseFirestoreTypes.CollectionReference<T>,
        [collection],
    );

    const getByDoc = useCallback(
        async (docPath: string) => {
            const query = await _document.doc(docPath).get();

            if (query.exists) {
                return query.data();
            }
        },
        [_document],
    );

    const create = useCallback(
        async (data: T) => {
            const query = await _document.add(data);

            return getByDoc(query.id);
        },
        [_document, getByDoc],
    );

    const update = useCallback(
        async (
            docPath: string,
            data: Partial<FirebaseFirestoreTypes.SetValue<T>>,
        ): Promise<void> => {
            return _document.doc(docPath).update(data);
        },
        [_document],
    );

    return {
        getByDoc,
        update,
        create,
    };
}

export default useCollection;
