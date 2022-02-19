import { UPDATE_LIST } from '../types/browser.types'
import { container } from 'constants/api.constants';
import network from 'helpers/network.helper';

export const fetchContent = (key) => async (dispatch) => {
  try {
    const response = await network.get(`${container.browser}${key}`);
    dispatch({ type: UPDATE_LIST, path: '/' + response.data.data.prefix, content: response.data.data });
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