import { UPDATE_LIST } from "store/types/browser.types";

export const initialState = {
  path: '/',
  content: undefined,
};

const browserReducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_LIST:
      return {
        ...state,
        path: action.path,
        content: action.content,
      };
    default:
      return { ...state };

  }
}

export default browserReducer;