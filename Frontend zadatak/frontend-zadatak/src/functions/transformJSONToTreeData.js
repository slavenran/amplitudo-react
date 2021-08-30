import { FolderOpenFilled, FolderFilled } from '@ant-design/icons';

import setFolderMaxId from "./folderMaxId"

const transformJSONToTreeData = (arr) => {
    const closedFolder = <FolderFilled style={{fontSize: 20}} />;
    const openFolder = <FolderOpenFilled style={{fontSize: 20}} />;

    if (arr?.folder) {
        setFolderMaxId(arr?.folder?.id);
        return [{
            key: arr?.folder?.id,
            title: arr?.folder?.name,
            icon: ({ expanded }) => (expanded ? openFolder : closedFolder),
            sector: arr?.folder?.sector,
            creationDate: arr?.folder?.creationDate,
            creator: arr?.folder?.creator,
            description: arr?.folder?.description,
            folderType: arr?.folder?.folderType,
            children: transformJSONToTreeData(arr?.folder?.parentFolder)
        }]
    } else if (Array.isArray(arr)) {
        return arr.map(data => {
            setFolderMaxId(data?.id);

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
                children: data?.parentFolder === null ? null : transformJSONToTreeData(data?.parentFolder)
            }
        })
    }
    else {
        return null
    }
}

export default transformJSONToTreeData;