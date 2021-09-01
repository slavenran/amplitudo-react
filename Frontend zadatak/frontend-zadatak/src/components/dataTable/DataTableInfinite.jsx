import React, { useEffect, useState } from 'react';
import { useRefresh } from '../../context/RefreshTableContext';
import { useVT } from 'virtualizedtableforantd4';
import moment from 'moment';
import Table from 'antd/lib/table';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PropTypes from 'prop-types';
import columns from '../../constants/tableColumns';
import style from './Table.module.scss';
import './Table.scss';

const scrollConfig = {
    y: "40vh",
    x: true,
};

const DataTableInfinite = ({ debug = false, folderData, setFileData, searchValue, activeRow, setActiveRow }) => {

    const [lastId, setLastId] = useState(7);    // preserves the last fetched id of document array
    const [allData, setAllData] = useState();   // complete data
    const [data, setData] = useState(allData?.slice(0, lastId)); // chopped data

    const { refreshData } = useRefresh(); // refresh table after update, search or folder switch

    const onFetch = () => {
        if (allData) {
            if (allData[lastId + 5]) {
                setData(data.concat(allData?.slice(lastId, lastId + 5)));
            } else if (lastId < allData.length) {
                setData(data.concat(allData?.slice(lastId, allData?.length)));
            }
            setLastId(prevState => prevState + 5);
        }
    }

    const [vt] = useVT(
        () => ({
            onScroll: ({ isEnd }) => {
                if (isEnd) {
                    setTimeout(() => {
                        onFetch();
                    }, 200);
                }
            },
            scroll: { y: scrollConfig.y },
            debug,
        }),
        [data]
    );

    useEffect(() => {
        setLastId(7);
        setData(null);
        setAllData(null);
        setTimeout(() => {
            // convert local doc data to antd readable format
            setAllData(JSON.parse(localStorage.getItem("documentList")).filter(file => file?.parentDir === folderData?.key)
                .map(file => {
                    return {
                        ...file,
                        key: file?.id,
                        name: file?.name,
                        docType: file?.path?.split(".")[1],
                        dateFormat: moment(file?.date, "DD-MM-YYYY")._d,
                        dots: <EllipsisOutlined style={{ fontSize: 30 }} />
                    }
                }).filter(file => file?.name.toLowerCase()?.includes(searchValue.toLowerCase())));
        }, 200);
    }, [searchValue, folderData?.key, refreshData]);

    useEffect(() => {
        setData(allData?.slice(0, lastId))
    }, [allData, lastId])

    return (
        <Table
            className={style.table}
            columns={columns}
            dataSource={data}
            loading={allData ? false : true}
            scroll={scrollConfig}
            components={vt}
            rowClassName={(record) => record?.key === activeRow ? 'data-row active-row' : 'data-row'}
            pagination={false}
            onRow={(record, _) => {
                return record &&
                    {
                        onClick: () => {
                            // update states on row click
                            setFileData(record);
                            setActiveRow(record?.key);
                        }
                    }
            }} />
    );
}

export default DataTableInfinite;

DataTableInfinite.propTypes = {
    folderData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    setFileData: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    activeRow: PropTypes.number,
    setActiveRow: PropTypes.func.isRequired
}