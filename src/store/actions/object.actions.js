import network from 'helpers/network.helper';
import { SET_FOLDER_CONTENT, } from '../types/object.types'
import { container } from 'constants/api.constants';

export const fetchObjectForFolder = (hash) => async (dispatch) => {
  try {
    const response = await network.get(`${container.fetchObjects}${hash}`);
    dispatch({ type: SET_FOLDER_CONTENT, folderContent: response.data.data });
  } catch (e) {
    console.log(e);
  }
};