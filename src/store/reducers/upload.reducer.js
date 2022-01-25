import { ADD_NEW_FILE, UPLOAD_PROGRESS } from '../types/upload.types';

export const initialState = {
  files: [],
  uploads: {},
}

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PROGRESS:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.file.file.name]: action.file
        }
      };
    default:
      return state;
  }
};

export default uploadReducer;