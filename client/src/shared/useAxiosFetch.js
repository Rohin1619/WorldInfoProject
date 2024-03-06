import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { get } from 'lodash';

const useAxiosFetch = (
    url,
    dataDefault = null,
    timeout,
    refetch = false,
    loadOnMount = true,
    searchParams = false
) => {
    const [data, setData] = useState(dataDefault);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(loadOnMount);
    const [status, setStatus] = useState(null);

    const initialLoadDone = useRef(false);

    useEffect(() => {
        let unmounted = false;
        const source = Axios.CancelToken.source();

        if ((!initialLoadDone.current && loadOnMount) || refetch) {
            setLoading(true);
            setError(false);
            setErrorMessage(null);
            setStatus(null);
            const options = {
                cancelToken: source.token,
                timeout
            };
            if (searchParams) {
                options.params = searchParams;
            }
            Axios.get(url, options)
                .then(res => {
                    initialLoadDone.current = true;
                    if (!unmounted) {
                        setData(res.data);
                        setLoading(false);
                        setStatus(res.status);
                    }
                })
                .catch(e => {
                    initialLoadDone.current = true;
                    if (!unmounted) {
                        setLoading(false);
                        if (!Axios.isCancel(e)) {
                            setStatus(e.response.status);
                            setError(true);
                            setErrorMessage(get(e, 'response.data.message', e.message));
                        }
                    }
                });
        }
        return () => {
            unmounted = true;
            source.cancel();
        };
    }, [timeout, url, refetch, loadOnMount, searchParams]);

    return { data, loading, error, errorMessage, status };
};

export default useAxiosFetch;
