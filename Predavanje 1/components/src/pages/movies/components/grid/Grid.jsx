import React, { useContext, useEffect, useState } from 'react';
import TableComponent from '../../../../components/table/TableComponent';
import MoviesData from '../../../../context/MoviesData';
import useDebounce from '../../../../customHooks/useDebounceHook';

const Grid = ({onRowClick}) => {
    const {list, dispatch} = useContext(MoviesData);
    // const {refresh, setRefresh} = useState(0);  // za re-renderovanje kroz key tabele
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 400);
    const header = ['Id', 'Naslov', 'Godina'];

    useEffect(() => {
        if(searchValue.length > 2) {
            dispatch({type: 'filter', data: debouncedValue})
        }
    }, [debouncedValue])

    return <div>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <TableComponent header={header} rows={list} onRowClick={onRowClick}/>
    </div>
}

export default Grid;