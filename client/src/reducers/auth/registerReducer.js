const registerReducerInitialState = {
    user: {},
    errors: {}
}
const registerReducer = (state = registerReducerInitialState, action) => {
    switch (action.type) {
        case 'GET_ERRORS_REGISTER':
            return {
                ...state,
                errors: action.errors // Loi tra ve ben component mapDispatchToProps
            };
        case "REGISTED_USER":
            return {
                ...state,
                user: action.user,
                errors: action.errors // user ket qua tra ve neu tao thanh cong va gan loi thanh rong de store khong con luu loi cu nua
            };
        default:
            return state
    }
}
export default registerReducer;