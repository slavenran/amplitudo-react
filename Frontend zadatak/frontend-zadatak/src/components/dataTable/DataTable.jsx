import React, { useEffect, useState } from 'react';
import Table from 'antd/lib/table';
import style from './Table.module.scss';
import './Table.scss';
import moment from 'moment';

const columns = [
  {
    title: 'Naziv dokumenta',
    dataIndex: 'name',
  },
  {
    title: 'Broj',
    dataIndex: 'number',
    sorter: {
      compare: (a, b) => a.number - b.number,
      multiple: 5,
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: {
      compare: (a, b) => a.status - b.status,
      multiple: 4,
    },
  },
  {
    title: 'Autor',
    dataIndex: 'author',
    sorter: {
      compare: (a, b) => a.author - b.author,
      multiple: 3,
    },
  },
  {
    title: 'Tip',
    dataIndex: 'type',
    sorter: {
      compare: (a, b) => a.type - b.type,
      multiple: 2,
    },
  },
  {
    title: 'Datum',
    dataIndex: 'date',
    sorter: {
      compare: (a, b) => a.dateFormat - b.dateFormat,
      multiple: 1,
    },
  },
];

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