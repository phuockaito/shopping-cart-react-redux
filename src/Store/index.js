import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import MyReducers from './CombineReducers';
const store = createStore(
    MyReducers,
    applyMiddleware(thunk)
);
export default store;