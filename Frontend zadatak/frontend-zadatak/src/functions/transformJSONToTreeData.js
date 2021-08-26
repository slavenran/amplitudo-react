import documentList from "../constants/documentList";

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
            const dataObj = {
                key: data?.id,
                title: data?.name,
                sector: data?.sector,
                creationDate: data?.creationDate,
                creator: data?.creator,
                description: data?.description,
                folderType: data?.folderType
            }

            return data?.files ?
                {
                    ...dataObj,
                    children: null,
                    files: data?.files.map(fileName =>
                        documentList.filter(data => data?.name === fileName)[0]
                    )
                }
                :
                {
                    ...dataObj,
                    children: data?.parentFolder === null ? null : transformJSONToTreeData(data?.parentFolder)
                }
        }
        )
    }
    else {
        return null
    }
}

export default transformJSONToTreeData;