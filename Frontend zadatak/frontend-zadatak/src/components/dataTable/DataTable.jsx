import React, { useEffect, useState } from 'react';
import { useRefresh } from '../../context/RefreshTableContext';
import Table from 'antd/lib/table';
import style from './Table.module.scss';
import './Table.scss';
import moment from 'moment';
import columns from '../../constants/tableColumns';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PropTypes from 'prop-types';
import setFileMaxId from '../../functions/fileMaxId';

const DataTable = ({ folderData, setFileData, searchValue, activeRow, setActiveRow }) => {

  const [data, setData] = useState(null); // state of data filtered by search input

  const { refreshData } = useRefresh(); // refresh table after update, search or folder switch

  useEffect(() => {
    setData(null);
    setTimeout(() => {
      setData(
        // convert local doc data to antd readable format
        JSON.parse(localStorage.getItem("documentList")).filter(file => file?.parentDir === folderData?.key)
          .map(file => {
            setFileMaxId(file?.id);
            return {
              ...file,
              key: file?.id,
              name: file?.name,
              docType: file?.path?.split(".")[1],
              dateFormat: moment(file?.date, "DD-MM-YYYY")._d,
              dots: <EllipsisOutlined style={{ fontSize: 30 }} />
            }
          }).filter(file => file?.name.toLowerCase()?.includes(searchValue.toLowerCase())))
    }, 200);
  }, [searchValue, folderData?.key, refreshData]);

  return <Table
    className={style.table}
    pagination={false}
    scroll={{ y: "40vh", x: "max-content" }}
    columns={columns}
    dataSource={data}
    loading={data ? false : true}
    rowClassName={(record) => record?.key === activeRow ? 'data-row active-row' : 'data-row'} // logic for active row style
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
}

export default DataTable;

DataTable.propTypes = {
  folderData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  setFileData: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  activeRow: PropTypes.number,
  setActiveRow: PropTypes.func.isRequired
}