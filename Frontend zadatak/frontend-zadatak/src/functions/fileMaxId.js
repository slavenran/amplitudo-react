// id to use when making a new file
let fileMaxId = 0;

export const getFileMaxId = () => {
  console.log(fileMaxId);
  return fileMaxId;
}

const setFileMaxId = (id) => {
    if (fileMaxId < id) {fileMaxId = id}
}

export default setFileMaxId;