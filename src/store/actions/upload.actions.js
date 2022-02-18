import { UPLOAD_PROGRESS, CLEAR_ALL } from '../types/upload.types'
import uploadNetwork from 'helpers/upload.helper';
import apiConstants from 'constants/api.constants';
import { ADD_NEW_OBJECT } from 'store/types/object.types';

export const initiateFileUpload = (files, path) => async (dispatch, getState) => {

  const uploadController = getState().upload;

  files.forEach((file) => {

    const dataArray = new FormData();

    dataArray.append("file", file);

    dataArray.append("path", path + file.path);

    const fileUploadName = `_${Math.floor(Math.random() * 1000)}_${Date.now()}`;

    const config = {
      onUploadProgress: progressEvent => {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        if (totalLength !== null) {
          const uploadProgress = {
            status: 'uploading',
            progress: Math.round((progressEvent.loaded * 100) / totalLength),
            file: file,
            name: fileUploadName,
          }
          dispatch({ type: UPLOAD_PROGRESS, file: uploadProgress });
        }
      }
    }
    uploadNetwork.post(`${apiConstants.container.upload}`, dataArray, config).then((e) => {
      const uploadProgress = {
        status: 'done',
        progress: 100,
        file: file,
        name: fileUploadName,
      }
      dispatch({ type: UPLOAD_PROGRESS, file: uploadProgress });
      dispatch({ type: ADD_NEW_OBJECT, object: e.data.data })
    }).catch((e) => {
      const uploadProgress = {
        status: 'failed',
        progress: 100,
        file: file,
        name: fileUploadName,
      }
      dispatch({ type: UPLOAD_PROGRESS, file: uploadProgress });
      console.log("failed to upload for file at index ", uploadController.files.indexOf(file));
    })
  })
}


export const clearAllUploads = () => async (dispatch) => {
  dispatch({ type: CLEAR_ALL, uploads: {} });
}