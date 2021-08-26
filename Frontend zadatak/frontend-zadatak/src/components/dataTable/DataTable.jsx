import React, { useEffect, useState } from 'react';
import Table from 'antd/lib/table';
import style from './Table.module.scss';
import './Table.scss';
import moment from 'moment';
import columns from '../../constants/tableColumns';

const DataTable = ({ folderData, setFileData, searchValue }) => {

  // state of data filtered by search input
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(
      folderData?.files.map(file => {
        return {
          ...file,
          key: file?.id,
          name: file?.name.split(".")[0],
          docType: file?.name.split(".")[1],
          dateFormat: moment(file?.date, "DD-MM-YYYY")._d
        }
      })
        .filter(file => file.name.includes(searchValue)));
  }, [searchValue, folderData?.files]);

  return <Table
    className={style.table}
    pagination={false}
    scroll={{ y: "40vh", x: "max-content" }}
    columns={columns}
    dataSource={data}
    loading={data ? false : true}
    onRow={(record, rowIndex) => {
      return {
        onClick: () => {
          // console.log(record, rowIndex)
          setFileData(record);
        }
      }
    }} />
}

export default DataTable;