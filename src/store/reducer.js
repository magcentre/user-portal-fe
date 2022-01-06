import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './reducers/customization.reducer';
import userReducer from './reducers/user.reducer';
import objectReducer from './reducers/object.reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    user: userReducer,
    objects: objectReducer
});

export default reducer;
