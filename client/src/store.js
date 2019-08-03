import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import loginReducer from './reducers/auth/loginReducer'
import registerReducer from './reducers/auth/registerReducer'
import profileReducer from './reducers/profile/profileReducer'

import thunk from 'redux-thunk'

const middleware = [thunk];

//Noi cac reducer quan ly state lai vao thanh mot de store quan ly reducer
const rootReducer = combineReducers({
    loginReducer: loginReducer,
    registerReducer: registerReducer,
    profileReducer:profileReducer
})

const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware),
    //Them truong nay de su dung redux dev tools
    //cho nay phai kiem tra vi neu trinh duyet khong cai redux dev tool thi thoi khong cai 
    //neu khong kiem tra se bi loi apply undefined
    ...(window.__REDUX_DEVTOOLS_EXTENSION__?[window.__REDUX_DEVTOOLS_EXTENSION__()]:[]))
);
store.subscribe(() => {
    console.log(store.getState());
})
export default store;