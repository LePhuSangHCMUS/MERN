import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import loginReducer from './reducers/auth/loginReducer'
import registerReducer from './reducers/auth/registerReducer'

import thunk from 'redux-thunk'

const middleware = [thunk];

//Noi cac reducer quan ly state lai vao thanh mot de store quan ly reducer
const rootReducer = combineReducers({
    loginReducer: loginReducer,
    registerReducer: registerReducer
})

const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware),
    //Them truong nay de su dung redux dev tools
    window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())
);
store.subscribe(() => {
    console.log(store.getState());
})
export default store;