import { useCallback, useEffect } from "react";

function useDebounce(callback, delay, deps) {
    const _callback = useCallback(callback, deps)

    useEffect(() => {
        const timerId = setTimeout(() => {
            _callback()
        }, delay);

        return () => {
            clearTimeout(timerId)
        }
    }, [_callback, delay])
}

export default useDebounce