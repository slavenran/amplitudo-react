import React, { useEffect, useState } from 'react';
import { useRefresh } from '../../context/RefreshTableContext';
import transformJSONToTreeData from '../../functions/transformJSONToTreeData';
import FolderMenu from '../folderMenu/FolderMenu';
import Tree from 'antd/lib/tree';
import PropTypes from 'prop-types';
import style from './Sider.module.scss';
import './TreeNode.scss';

const { DirectoryTree } = Tree;

const SiderComponent = ({ selectFolder, resetFilters, setShowMenu, setMenuData, setShowFolderCreationModal, setFolderData }) => {
    // fetch and transform data into antd tree format
    const [dataTree, setDataTree] = useState();

    const { refreshData, setRefreshData } = useRefresh();    // refresh data on folder select

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
                setShowMenu={(e) => setShowMenu(e)}
                setShowFolderCreationModal={(e) => setShowFolderCreationModal(e)} />);
            setShowMenu(prevState => !prevState);
        }
    }

    useEffect(() => {
        setDataTree(transformJSONToTreeData(JSON.parse(localStorage.getItem("folderTree"))));
    }, [refreshData])

    return <DirectoryTree
        className={style.directoryStyle}
        multiple
        onSelect={onSelect}
        onRightClick={onRightClick}
        treeData={dataTree}
    />
}

export default SiderComponent;

// selectFolder, resetFilters, setMenu, setMenuData, setShow, setFolderData
SiderComponent.propTypes = {
    selectFolder: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired,
    setShowMenu: PropTypes.func.isRequired,
    setMenuData: PropTypes.func.isRequired,
    setShowFolderCreationModal: PropTypes.func.isRequired,
    setFolderData: PropTypes.func.isRequired,
}