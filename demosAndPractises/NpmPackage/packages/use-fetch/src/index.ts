import { useEffect, useRef, useState } from 'react';
/**
* useFetch - simple, framework-agnostic JSON fetch hook
* - url: string | null — when null the hook does nothing
* - returns { data, loading, error }
*
* Note: This is a thin helper; it does not perform runtime schema validation.
*/
export function useFetch<T = unknown>(url: string | null) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown | null>(null);
    const controllerRef = useRef<AbortController | null>(null);
    useEffect(() => {
        if (!url) return;
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) throw new Error(`Network response was not ok:
 ${res.status} ${res.statusText}`);
                const json = (await res.json()) as T;
                if (controllerRef.current === controller) setData(json);
            } catch (err: any) {
                if (err?.name === 'AbortError') return;
                if (controllerRef.current === controller) setError(err);
                // keep a console.debug for consumer debugging (non-fatal)
                console.debug('[useFetch] error', { url, error: err });
            } finally {
                if (controllerRef.current === controller) setLoading(false);
            }
        })();
        return () => {
            controllerRef.current?.abort();
            if (controllerRef.current === controller) controllerRef.current = null;
        };
    }, [url]);
    return { data, loading, error };
}