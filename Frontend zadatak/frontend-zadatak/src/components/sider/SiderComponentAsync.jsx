import React, { useState } from 'react';
import { useRefresh } from '../../context/RefreshTableContext';
import transformJSONToTreeData from '../../functions/transformJSONToTreeData';
import Tree from 'antd/lib/tree';
import { FolderOpenFilled, FolderFilled } from '@ant-design/icons';
import style from './Sider.module.scss';
import './TreeNode.scss';
import FolderMenu from '../folderMenu/FolderMenu';
import setFolderMaxId, { getFolderMaxId } from '../../functions/folderMaxId';

const { DirectoryTree } = Tree;

const closedFolder = <FolderFilled style={{ fontSize: 20 }} />;
const openFolder = <FolderOpenFilled style={{ fontSize: 20 }} />;

function updateTreeData(list, key, children) {
    console.log("ITS UPDATING", list, key, children);
    return list.map((node) => {
        console.log("NODE: ", node);
        setFolderMaxId(getFolderMaxId < node?.id ? node?.id : getFolderMaxId);
        if (node.key === key) {
            console.log("PRVI IF", { ...node, children })
            return { ...node, children };
        }

        if (node.children) {
            console.log("DRUGI IF", node.children)
            return { ...node, children: updateTreeData(node.children, key, children) };
        }

        return node;
    });
}

const SiderComponentAsync = ({ selectFolder, resetFilters, setMenu, setMenuData, setShow, setFolderData }) => {
    const dataTree = JSON.parse(localStorage.getItem("folderTree"));
    // fetch and transform data into antd tree format

    const initTreeData = [
        {
            key: dataTree?.folder?.id,
            title: dataTree?.folder?.name,
            icon: ({ expanded }) => (expanded ? openFolder : closedFolder),
            sector: dataTree?.folder?.sector,
            creationDate: dataTree?.folder?.creationDate,
            creator: dataTree?.folder?.creator,
            description: dataTree?.folder?.description,
            folderType: dataTree?.folder?.folderType,
            children: dataTree?.folder?.parentFolder
        }
    ];

    setFolderMaxId(getFolderMaxId < dataTree?.folder?.id ? dataTree?.folder?.id : getFolderMaxId);

    // const [selectedNode, setSelectedNode] = useState()
    const [treeData, setTreeData] = useState(initTreeData);

    console.log(treeData)

    const { setRefreshData } = useRefresh();    // refresh data on folder select

    function onLoadData({ key, children }) {
        // if (children === null) {return}
        console.log("KEYCHILDREN: ", key, children)

        console.log(children);
        return new Promise((resolve) => {
            if (children === null) {
                resolve();
                return;
            }

            setTimeout(() => {
                const newChildren = children?.map(data => {
                    setFolderMaxId(getFolderMaxId < data?.id ? data?.id : getFolderMaxId);
                    const icon = data?.folderType === "organizer" ?
                        ({ expanded }) => (expanded ? openFolder : closedFolder)
                        :
                        ({ selected }) => (selected ? openFolder : closedFolder)

                    return {
                        key: data?.id,
                        title: data?.name,
                        icon: icon,
                        sector: data?.sector,
                        creationDate: data?.creationDate,
                        creator: data?.creator,
                        description: data?.description,
                        folderType: data?.folderType,
                        children: data?.parentFolder
                    }
                });
                console.log("AAAAA")
                setTreeData((origin) => {
                    console.log("ORIGINS: ", origin)
                    return updateTreeData(origin, key, newChildren)
                });
                resolve();
            }, 1000);
        });
    }

    const onSelect = (_, info) => {
        selectFolder(info?.node);
        resetFilters();
        setRefreshData();
    };

    const onRightClick = ({ event, node }) => {
        // show folder menu only if folder is an organizer and pass it folder data
        if (node?.folderType === "organizer") {
            setMenuData(<FolderMenu pageX={event?.clientX} pageY={event?.clientY} folderData={node} setFolderData={(e) => setFolderData(e)} setMenu={(e) => setMenu(e)} setShow={(e) => setShow(e)} />);
            setMenu(prevState => !prevState);
        }
    }

    const onExpand = () => {
        // async loading here
    };

    return <DirectoryTree
        className={style.directoryStyle}
        // multiple
        onSelect={onSelect}
        // onExpand={onExpand}
        onRightClick={onRightClick}
        loadData={onLoadData}
        treeData={treeData}
    />
}

export default SiderComponentAsync;