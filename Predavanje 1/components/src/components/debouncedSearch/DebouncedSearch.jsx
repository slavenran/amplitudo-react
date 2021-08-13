import React, { useEffect, useState } from 'react';
import useDebounce from '../../customHooks/useDebounceHook';

const DebouncedSearch = () => {
    const [value, setValue] = useState();
    const debouncedValue = useDebounce(value, 1000);

    useEffect(() => {
        console.log(debouncedValue);
    }, [debouncedValue])

    return <input value={value} onChange={(e) => setValue(e.target.value)}/>
}

export default DebouncedSearch;