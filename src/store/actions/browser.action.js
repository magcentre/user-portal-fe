import { UPDATE_LIST } from '../types/browser.types'
import { container } from 'constants/api.constants';
import network from 'helpers/network.helper';

export const fetchContent = (key) => async (dispatch) => {
  try {
    const response = await network.get(`${container.browser}${key}`);
    dispatch({ type: UPDATE_LIST, path: '/' + response.data.data.prefix, pathKey: response.data.data.prefixKey, content: response.data.data });
  } catch (e) {
    console.log(e);
  }
};

export const clearBrowser = (hash) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LIST, path: '/', content: undefined });
  } catch (e) {
    console.log(e);
  }
};

export const folderCreate = (pathKey, folderName) => async (dispatch) => {
  try {
    const createResponse = await network.post(`${container.bucket.folderCreate}`, {
      folderName: folderName, pathKey,
    });
    const response = await network.get(`${container.browser}/${pathKey}`);
    dispatch({ type: UPDATE_LIST, path: '/' + response.data.data.prefix, pathKey: response.data.data.prefixKey, content: response.data.data });
  } catch (e) {
    console.log(e);
  }
}

export const folderRename = (pathKey, name, parentKey) => async (dispatch) => {
  try {
    const renameResponse = await network.post(`${container.bucket.folderRename}`, {
      name, pathKey, parentKey,
    });
    const response = await network.get(`${container.browser}/${parentKey}`);
    dispatch({ type: UPDATE_LIST, path: '/' + response.data.data.prefix, pathKey: response.data.data.prefixKey, content: response.data.data });
  } catch (e) {
    console.log(e);
  }
}