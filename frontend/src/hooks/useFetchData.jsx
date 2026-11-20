import { useCallback, useEffect, useState } from 'react';
import { getToken } from "../config";

const useFetchData = url => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        // ignore responses from an outdated url (e.g. fast typing in search)
        let ignore = false;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = getToken();
                const res = await fetch(url, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message + '🤯');
                }

                if (!ignore) setData(result.data);
            } catch (err) {
                if (!ignore) setError(err.message);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        fetchData();

        return () => {
            ignore = true;
        };
    }, [url, reloadKey]);

    // call this to load the data again (e.g. after an update)
    const refetch = useCallback(() => setReloadKey(k => k + 1), []);

    return { data, loading, error, refetch };
};

export default useFetchData;
