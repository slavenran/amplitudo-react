import React from 'react';
import Tree from 'antd/lib/tree';
import { FolderOpenFilled, FolderFilled } from '@ant-design/icons';
import style from './Sider.module.scss';
import './TreeNode.scss';
import transformJSONToTreeData from '../../functions/transformJSONToTreeData';
import { useRefresh } from '../../context/RefreshData';

const { DirectoryTree } = Tree;

const SiderComponent = ({ selectFolder, resetFilters }) => {
    // fetch and transform data into antd tree format
    const dataTree = transformJSONToTreeData(JSON.parse(localStorage.getItem("folderTree")));

    const { setRefreshData } = useRefresh();

    const onSelect = (keys, info) => {
        // console.log(info?.node);
        selectFolder(info?.node);
        resetFilters();
        setRefreshData();
    };

    const onExpand = () => {
        // console.log('Trigger Expand');
    };

    return <DirectoryTree
        className={style.directoryStyle}
        icon={<FolderFilled className={style.iconStyle} />}
        multiple
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={dataTree}
    />
}

export default SiderComponent;