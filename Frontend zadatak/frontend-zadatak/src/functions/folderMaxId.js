// id to use when making a new file
let folderMaxId = 0;

export const getFolderMaxId = () => {
    return folderMaxId;
}

const setFolderMaxId = (id) => {
    if (folderMaxId < id) {folderMaxId = id}
}

export default setFolderMaxId;