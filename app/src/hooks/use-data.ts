import pb from '@/db/conn';
import { ClientResponseError, ListResult, RecordListOptions } from 'pocketbase';
import { useEffect, useState } from 'react';

const useData = <T>(
  collectionName: string,
  page: number = 1,
  perPage: number = 10,
  filter?: RecordListOptions
) => {
  const [data, setData] = useState<ListResult<T> | null>(null);
  const [error, setError] = useState<ClientResponseError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: ListResult<T> = await pb
          .collection(collectionName)
          .getList(page, perPage, filter ?? {});
        setData(response);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof ClientResponseError) {
          setError(err);
          setIsLoading(false);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error };
};

export default useData;
