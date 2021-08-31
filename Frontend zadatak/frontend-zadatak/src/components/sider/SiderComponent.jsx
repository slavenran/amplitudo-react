import React from 'react';
import { useRefresh } from '../../context/RefreshTableContext';
import transformJSONToTreeData from '../../functions/transformJSONToTreeData';
import FolderMenu from '../folderMenu/FolderMenu';
import Tree from 'antd/lib/tree';
import style from './Sider.module.scss';
import './TreeNode.scss';

const { DirectoryTree } = Tree;

const SiderComponent = ({ selectFolder, resetFilters, setMenu, setMenuData, setShow, setFolderData }) => {
    // fetch and transform data into antd tree format
    const dataTree = transformJSONToTreeData(JSON.parse(localStorage.getItem("folderTree")));

    const { setRefreshData } = useRefresh();    // refresh data on folder select

    const onSelect = (_, info) => {
        selectFolder(info?.node);
        resetFilters();
        setRefreshData();
    };

    const onRightClick = ({ event, node }) => {
        // show folder menu only if folder is an organizer and pass it folder data
        if (node?.folderType === "organizer") {
            setMenuData(<FolderMenu
                pageX={event?.clientX}
                pageY={event?.clientY}
                folderData={node}
                setFolderData={(e) => setFolderData(e)}
                setMenu={(e) => setMenu(e)}
                setShow={(e) => setShow(e)} />);
            setMenu(prevState => !prevState);
        }
    }

    const onExpand = () => {
        // async loading here
    };

    return <DirectoryTree
        className={style.directoryStyle}
        multiple
        onSelect={onSelect}
        onExpand={onExpand}
        onRightClick={onRightClick}
        treeData={dataTree}
    />
}

export default SiderComponent;