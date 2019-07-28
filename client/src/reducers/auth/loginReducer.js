const loginReducerInitialState = {
    isAuthenticated: false,
    user: {},
    errors: {}
}
const loginReducer = (state = loginReducerInitialState, action) => {
    switch (action.type) {
        case 'GET_ERRORS_LOGIN':
            return { ...state, errors: action.errors };
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.user, errors: {}, isAuthenticated: true };
        case 'LOGOUT_USER':
            //IsAuthentacation==>False
            return { ...state, user:{}, errors: {}, isAuthenticated: false };
        default:
            return state
    }
}
export default loginReducer;