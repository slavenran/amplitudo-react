import { getFolderMaxId } from "./folderMaxId"
import moment from "moment"

const updateTree = (arr, data, folderData) => {
    const iterateTree = (arr) => {
        if (arr?.folder) {
            folderData?.key === arr?.folder?.id ?
                arr.folder.parentFolder = [...arr.folder.parentFolder, {
                    id: getFolderMaxId() + 1,
                    ...data,
                    creationDate: moment().format("DD.MM.YYYY."),
                    parentFolder: data?.folderType === "docFolder" ? null : []
                }]
                :
                iterateTree(arr?.folder?.parentFolder)
        } else if (Array.isArray(arr)) {
            arr.forEach(arrData => {
                folderData?.key === arrData?.id ?
                    arrData.parentFolder = [...arrData.parentFolder, {
                        id: getFolderMaxId() + 1,
                        ...data,
                        creationDate: moment().format("DD.MM.YYYY."),
                        parentFolder: data?.folderType === "docFolder" ? null : []
                    }]
                    :
                    iterateTree(arrData?.parentFolder)
            })
        }
    }
    iterateTree(arr);
}

export default updateTree;