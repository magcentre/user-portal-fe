import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customization.reducer';
import userReducer from './user.reducer';
import objectReducer from './object.reducer';
import trashReducer from './trash.reducer';
import dashboardReducer from './dashboard.reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    user: userReducer,
    objects: objectReducer,
    trash: trashReducer,
    dashboard: dashboardReducer
});

export default reducer;
