import network from 'helpers/network.helper';
import { SET_FOLDER_CONTENT, CLEAR_STATE } from '../types/object.types'
import { container } from 'constants/api.constants';

export const fetchObjectForFolder = (hash) => async (dispatch) => {
  try {
    const response = await network.get(`${container.folder}${hash}`);
    dispatch({ type: SET_FOLDER_CONTENT, folderContent: response.data.data, folderHash: hash });
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

export const handleStaredState = (hash, type, isStarred) => async (dispatch, getState) => {
  try {
    const objects = { ...getState().objects };
    const apiEndPoint = type ? `${container.object}${hash}` : `${container.folder}${hash}`;
    await network.patch(`${apiEndPoint}`, { isStared: isStarred });
    (objects.folderContent || []).forEach((e) => {
      if (e.hash === hash) e.isStared = !e.isStared;
    });
    dispatch({ type: SET_FOLDER_CONTENT, folderContent: objects.folderContent, folderHash: hash });
  } catch (e) {
    console.log(e);
  }
};

export const updateObjectState = (hash, type, objectConfig) => async (dispatch, getState) => {
  try {
    const objects = { ...getState().objects };
    const apiEndPoint = type ? `${container.object}${hash}` : `${container.folder}${hash}`;
    const response = await network.patch(`${apiEndPoint}`, objectConfig);
    (objects.folderContent || []).forEach((e) => {
      if (e.hash === hash) {
        e.name = objectConfig.name;
      }
    });
    dispatch({ type: SET_FOLDER_CONTENT, folderContent: objects.folderContent, folderHash: hash });
  } catch (e) {
    console.log(e);
  }
};