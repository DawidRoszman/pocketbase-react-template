import pb from '@/db/conn';
import ProductCreateDto from '@/models/dto/product-create-dto';
import { ClientResponseError } from 'pocketbase';
import { useState } from 'react';

type Data = ProductCreateDto;
const useCreate = (collectionPath: string) => {
  const [isDataAdded, setDataAdded] = useState(false);
  const [error, setError] = useState<ClientResponseError | null>(null);

  const addData = async (newData: Data) => {
    setDataAdded(false);
    try {
      await pb.collection(collectionPath).create(newData);
      setDataAdded(true);
    } catch (err) {
      if (err instanceof ClientResponseError) {
        setError(err);
      }
    }
  };

  const updateData = async (newData: Data, id: string) => {
    setDataAdded(false);
    try {
      await pb.collection(collectionPath).update(id, newData);
      setDataAdded(true);
    } catch (err) {
      if (err instanceof ClientResponseError) {
        setError(err);
      }
    }
  };

  return { addData, updateData, isDataAdded, error };
};

export default useCreate;
