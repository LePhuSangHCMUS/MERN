const profileReducerInitialState = {
    profile: {},
    profiles: [],
    errors: {},
    loading: false
}
const profileReducer = (state = profileReducerInitialState, action) => {
    switch (action.type) {
        case "GET_ERRORS_CREATE_PROFILE":
            return { ...state, errors: action.errors }
        case 'CREATE_PROFILE_SUCCESS':
            return { ...state, errors: {}, profile: action.profile }
        case 'GET_PROFILE_SUCCESS':
            return { ...state, errors: {}, profile: action.profile, loading: true }
        case 'NO_PROFILE':
            return { ...state, errors: {}, profile: {}, loading: true }
        case 'DELETE_PROFILE':
            return { ...state, errors: {}, profile: {}, loading: true }
        case 'UPDATE_PROFILE_SUCCESS':
            return { ...state, errors: {}, profile: action.profile }
        case 'ADD_EXPERIENCE_SUCCESS':
            return { ...state, errors: {} }
        case 'ADD_EXPERIENCE_ERRORS':
            return { ...state, errors: action.errors }
        case 'ADD_EDUCATION_ERRORS':
            return { ...state, errors: action.errors }
        case 'ADD_EDUCATION_SUCCESS':
            return { ...state, errors: {}, loading: false }
        case 'DELETE_EDUCATION_SUCCESS':
            return { ...state, errors: {} }
        case 'GET_ERRORS_UPDATE_PROFILE':
            return { ...state, errors: action.errors }
        case 'GET_PROFILES_SUCCESS':
            return { ...state, errors: {}, profiles: action.profiles }
        default:

            return state
    }
}
export default profileReducer;