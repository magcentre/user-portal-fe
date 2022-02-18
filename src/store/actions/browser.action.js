import { UPDATE_LIST } from '../types/browser.types'
import { container } from 'constants/api.constants';
import network from 'helpers/network.helper';

export const fetchContent = (hash) => async (dispatch) => {
  try {
    const response = await network.get(`${container.browser}${hash}`);
    dispatch({ type: UPDATE_LIST, path: '/', content: response.data.data });
  } catch (e) {
    console.log(e);
  }
};