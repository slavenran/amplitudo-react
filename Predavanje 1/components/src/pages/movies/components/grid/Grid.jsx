import React, { useContext, useEffect, useState } from 'react';
import Table from '../../../../components/table/Table';
import MoviesData from '../../../../context/MoviesData';
import useDebounce from '../../../../customHooks/useDebounceHook';

const Grid = () => {
    const {list, dispatch} = useContext(MoviesData);
    // const {refresh, setRefresh} = useState(0);  // za re-renderovanje kroz key tabele
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 400);
    const header = ['Id', 'Naslov', 'Godina'];

    useEffect(() => {
        if(debouncedValue && debouncedValue.length > 3) {
            dispatch({type: 'filter', data: debouncedValue})
        }
    }, [debouncedValue])

    return <div>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <Table header={header} rows={list}/>
    </div>
}

export default Grid;