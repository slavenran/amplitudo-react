const transformJSONToTreeData = (arr) => {
    if (arr?.folder) {
        return [{
            key: arr?.folder?.id,
            title: arr?.folder?.name,
            sector: arr?.folder?.sector,
            creationDate: arr?.folder?.creationDate,
            creator: arr?.folder?.creator,
            description: arr?.folder?.description,
            folderType: arr?.folder?.folderType,
            children: transformJSONToTreeData(arr?.folder?.parentFolder)
        }]
    } else if (Array.isArray(arr)) {
        return arr.map(data => {
            return {
                key: data?.id,
                title: data?.name,
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