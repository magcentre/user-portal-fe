import network from 'helpers/network.helper';
import { SET_TRASH_OBJECTS, CLEAR_TRASH_STATE } from '../types/trash.types'
import { container } from 'constants/api.constants';

export const fetchTrashObjects = () => async (dispatch) => {
  try {
    const response = await network.get(`${container.trash}`);
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


export const handelObjectDelete = (hash, type) => async (dispatch, getState) => {
  const trash = getState().trash;
  const unDeleted = [];
  try {
    const apiEndPoint = type ? `${container.object}${hash}` : `${container.folder}${hash}`;
    await network.delete(`${apiEndPoint}`);
    trash.trashElements.forEach((e) => {
      if (e.hash !== hash) unDeleted.push(e);
    });
    dispatch({ type: SET_TRASH_OBJECTS, trashElements: unDeleted });
  } catch (e) {
    console.log(e);
  }
};

export const handelObjectRestore = (hash, type) => async (dispatch, getState) => {
  const trash = getState().trash;
  const unDeleted = [];
  try {
    const apiEndPoint = type ? `${container.object}${hash}` : `${container.folder}${hash}`;
    await network.patch(`${apiEndPoint}`, { isTrash: false });
    trash.trashElements.forEach((e) => {
      if (e.hash !== hash) unDeleted.push(e);
    });
    dispatch({ type: SET_TRASH_OBJECTS, trashElements: unDeleted });
  } catch (e) {
    console.log(e);
  }
};