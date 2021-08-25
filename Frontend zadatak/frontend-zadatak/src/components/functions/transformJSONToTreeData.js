const transformJSONToTreeData = (arr) => {
    if (arr?.folder) {
        return [{
            key: arr?.folder?.id,
            title: arr?.folder?.name,
            folderType: arr?.folder?.folderType,
            children: transformJSONToTreeData(arr?.folder?.parentFolder)
        }]
    } else if (Array.isArray(arr)) {
        return arr.map(data => {
            return {
                key: data?.id,
                title: data?.name,
                folderType: data?.folderType,
                children: data?.parentFolder === null ? null : transformJSONToTreeData(data?.parentFolder)
            }
        })
    } else {
        return null
    }
}

export default transformJSONToTreeData;