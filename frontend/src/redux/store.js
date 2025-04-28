import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
// Remove the devtools extension import
// import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './reducers/userReducer';
import skillReducer from './reducers/skillReducer';
import { scheduleReducer, scheduleCreateReducer } from './reducers/scheduleReducer';
import bookingReducer from "./reducers/bookingReducer"; 
import messageReducer from "./reducers/messageReducer";


const rootReducer = combineReducers({
  user: userReducer,
  skill: skillReducer,
  schedule: scheduleReducer,
  scheduleCreate: scheduleCreateReducer,
  booking: bookingReducer,
  message: messageReducer,
});

// Just use applyMiddleware for now
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
