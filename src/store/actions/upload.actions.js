import { ADD_NEW_FILE, UPLOAD_PROGRESS } from '../types/upload.types'
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
          dispatch({ type: UPLOAD_PROGRESS, progress: Math.round((progressEvent.loaded * 100) / totalLength), index: uploadController.files.indexOf(file) });
        }
      }
    }
    uploadNetwork.post(`${apiConstants.container.upload}${hash}`, dataArray, config).then((e) => {
      console.log("upload finished for file at index ", uploadController.files.indexOf(file));
    }).catch((e) => {
      console.log("failed to upload for file at index ", uploadController.files.indexOf(file));
    })

    dispatch({ type: ADD_NEW_FILE, file: { file, status: 'initiated', progress: 0} });
  })

  

}