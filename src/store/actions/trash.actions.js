import network from 'helpers/network.helper';
import { SET_TRASH_OBJECTS, CLEAR_TRASH_STATE } from '../types/trash.types'
import { trash } from 'constants/api.constants';

export const fetchTrashObjects = () => async (dispatch) => {
  try {
    const response = await network.get(`${trash.getTrash}`);
    dispatch({ type: SET_TRASH_OBJECTS, trashElements: response.data.data });
  } catch (e) {
    console.log(e);
  }
};

export const clearTrashState = () => {
  return (dispatch) => dispatch({
    type: CLEAR_TRASH_STATE,
    trashElements: undefined,
  });
};