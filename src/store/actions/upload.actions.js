import { UPLOAD_PROGRESS } from '../types/upload.types'
import uploadNetwork from 'helpers/upload.helper';
import apiConstants from 'constants/api.constants';

export const initiateFileUpload = (files, hash) => async (dispatch, getState) => {

  const uploadController = getState().upload;

  console.log(files);

  files.forEach((file) => {

    const dataArray = new FormData();

    dataArray.append("file", file);

    const config = {
      onUploadProgress: progressEvent => {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        if (totalLength !== null) {
          const uploadProgress = {
            status: 'uploading',
            progress: Math.round((progressEvent.loaded * 100) / totalLength),
            file: file,
          }
          dispatch({ type: UPLOAD_PROGRESS, file: uploadProgress });
        }
      }
    }
    uploadNetwork.post(`${apiConstants.container.upload}${hash}`, dataArray, config).then((e) => {
      console.log("upload finished for file at index ", uploadController.files.indexOf(file));
    }).catch((e) => {
      const uploadProgress = {
        status: 'done',
        progress: 100,
        file: file,
      }
      dispatch({ type: UPLOAD_PROGRESS, file: uploadProgress });
      console.log("failed to upload for file at index ", uploadController.files.indexOf(file));
    })
  })



}