import React from 'react';
import Tree from 'antd/lib/tree';
import { FolderOpenFilled, FolderFilled } from '@ant-design/icons';
import style from './Sider.module.scss';
import './TreeNode.scss';
import folderTree from '../../constants/folderTree';
import transformJSONToTreeData from '../../functions/transformJSONToTreeData';

const { DirectoryTree } = Tree;

// transform data into antd tree format
const dataTree = transformJSONToTreeData(folderTree);

const SiderComponent = ({selectFolder, resetFilters}) => {

    const onSelect = (keys, info) => {
        // console.log(info?.node);
        selectFolder(info?.node);
        resetFilters();
    };

    const onExpand = () => {
        // console.log('Trigger Expand');
    };

    return <>
        <DirectoryTree
            className={style.directoryStyle}
            icon={<FolderFilled className={style.iconStyle} />}
            multiple
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={dataTree}
        />
    </>
}

export default SiderComponent;