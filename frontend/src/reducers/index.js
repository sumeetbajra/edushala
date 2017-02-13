import { combineReducers } from 'redux';

import { counterReducer } from './counterReducer';
import { userReducer } from './userReducer';

const reducer = combineReducers({
	counter: counterReducer,
	user: userReducer
})

export default reducer;