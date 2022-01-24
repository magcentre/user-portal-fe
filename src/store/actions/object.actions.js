import network from 'helpers/network.helper';
import { SET_FOLDER_CONTENT, CLEAR_STATE } from '../types/object.types'
import { container } from 'constants/api.constants';

export const fetchObjectForFolder = (hash) => async (dispatch) => {
  try {
    const response = await network.get(`${container.folder}${hash}`);
    dispatch({ type: SET_FOLDER_CONTENT, folderContent: response.data.data });
  } catch (e) {
    console.log(e);
  }
};

export const fetchRecentObjects = () => async (dispatch) => {
  try {
    const response = await network.get(`${container.recentObjects}`);
    dispatch({ type: SET_FOLDER_CONTENT, folderContent: response.data.data });
  } catch (e) {
    console.log(e);
  }
};

export const fetchStarredObjects = () => async (dispatch) => {
  try {
    const response = await network.get(`${container.staredObjects}`);
    dispatch({ type: SET_FOLDER_CONTENT, folderContent: response.data.data });
  } catch (e) {
    console.log(e);
  }
};

export const clearBrowserState = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_STATE, folderContent: undefined });
  } catch (e) {
    console.log(e);
  }
};

export const handleStaredState = (hash, isStarred) => async (dispatch, getState) => {
  try {
    const objects = { ...getState().objects };
    await network.patch(`${container.object}${hash}`, { isStared: isStarred });
    (objects.folderContent || []).forEach((e) => {
      if (e.hash === hash) e.isStared = !e.isStared;
    });
    dispatch({ type: SET_FOLDER_CONTENT, folderContent: objects.folderContent });
  } catch (e) {
    console.log(e);
  }
};