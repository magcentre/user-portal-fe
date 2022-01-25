import { GET_DASHBOARD_FOLDER } from '../types/dashboard.types'
import { container } from 'constants/api.constants';
import network from 'helpers/network.helper';

export const fetchFolders = (hash) => async (dispatch) => {
  try {
    const response = await network.get(`${container.folder}${hash}`);
    dispatch({ type: GET_DASHBOARD_FOLDER, folderContent: response.data.data, folderHash: hash });
  } catch (e) {
    console.log(e);
  }
};
