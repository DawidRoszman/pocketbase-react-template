import pb from '@/db/conn';
import { ClientResponseError } from 'pocketbase';
import { useState } from 'react';

const useDelete = (collectionPath: string) => {
  const [isDataDeleted, setDataDeleted] = useState(false);
  const [error, setError] = useState<ClientResponseError | null>(null);

  const deleteData = async (id: string) => {
    setDataDeleted(false);
    try {
      await pb.collection(collectionPath).delete(id);
      setDataDeleted(true);
    } catch (err) {
      if (err instanceof ClientResponseError) {
        setError(err);
      }
    }
  };

  return { deleteData, isDataDeleted, error };
};

export default useDelete;
