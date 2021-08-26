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

export default columns;