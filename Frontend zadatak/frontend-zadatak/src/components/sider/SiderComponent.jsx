import React from 'react';
import Tree from 'antd/lib/tree';
import { FolderOpenFilled, FolderFilled } from '@ant-design/icons';
import style from './Sider.module.scss';
import './TreeNode.scss';
import folderTree from '../../constants/folderTree';
import transformJSONToTreeData from '../functions/transformJSONToTreeData';

const { DirectoryTree } = Tree;

const dataTree = transformJSONToTreeData(folderTree);

const SiderComponent = () => {

    const onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };

    const onExpand = () => {
        console.log('Trigger Expand');
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








const comments = {
    // const [icon, setIcon] = useState(true);

    // const renderFn = (arr) => {
    //     console.log('sooos');
    //     return arr ?
    //         arr.map(data => <TreeNode
    //             key={data.key}
    //             title={data.title}
    //             children={renderFn(data.children)} />)
    //         :
    //         null
    // }

    // const onExpand = () => {
    //     console.log(icon);
    //     setIcon(prevState => !prevState)
    // }
    
    // < Tree
    //     className = { style.directoryStyle }
    //     onExpand = { onExpand }
    //     onSelect = { onSelect } >
    //     {
    //         renderFn(treeData)
    //     }
    // </Tree >
}