import React, { useEffect, useState } from 'react';
import Table from 'antd/lib/table';
import style from './Table.module.scss';
import './Table.scss';
import moment from 'moment';
import columns from '../../constants/tableColumns';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';

const DataTable = ({ folderData, setFileData, searchValue, activeRow, setActiveRow }) => {

  // state of data filtered by search input
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    setTimeout(() => {
      setData(
        folderData?.files.map(file => {
          return {
            ...file,
            key: file?.id,
            name: file?.name.split(".")[0],
            docType: file?.name.split(".")[1],
            dateFormat: moment(file?.date, "DD-MM-YYYY")._d,
            dots: <EllipsisOutlined style={{ fontSize: 30 }} />
          }
        })
          .filter(file => file.name.includes(searchValue)));
    }, 200);
  }, [searchValue, folderData?.files]);

  return <Table
    className={style.table}
    pagination={false}
    scroll={{ y: "40vh", x: "max-content" }}
    columns={columns}
    dataSource={data}
    loading={data ? false : true}
    rowClassName={(record) => record?.key === activeRow ? 'data-row active-row' : 'data-row'}
    onRow={(record, rowIndex) => {
      return {
        onClick: () => {
          // console.log(record?.key, rowIndex)
          setFileData(record);
          setActiveRow(record?.key);
        }
      }
    }} />
}

export default DataTable;