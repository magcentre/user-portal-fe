import { ADD_NEW_FILE, UPLOAD_PROGRESS  } from '../types/upload.types';

export const initialState = {
  files: [],
}

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_FILE:
      return {
        ...state,
        files: [...state.files, action.file]
      };
    default:
      return state;
  }
};

export default uploadReducer;