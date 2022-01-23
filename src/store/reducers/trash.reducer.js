import { SET_TRASH_OBJECTS, CLEAR_TRASH_STATE } from '../types/trash.types';

export const initialState = {
  trashElements: undefined,
  trashLoaded: false,
};

const trashReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRASH_OBJECTS:
      return {
        ...state,
        trashElements: action.trashElements,
        trashLoaded: true,
      };
    case CLEAR_TRASH_STATE:
      return initialState;
    default:
      return state;
  }
};

export default trashReducer;