import { GET_DASHBOARD_FOLDER } from '../types/dashboard.types';

export const initialState = {
  folderHash: 'myfiles',
  folderObject: undefined,
  folderContent: undefined,
  folderStack: [],
};


const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_FOLDER:
      return {
        ...state,
        folderContent: action.folderContent
      };
    default:
      return state;
  }
};

export default dashboardReducer;