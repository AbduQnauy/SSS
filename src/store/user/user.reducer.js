const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    switch(type) {
        case 'SIGN_IN_SUCCESS':
            return { ...state, currentUser: payload}
        case 'SIGN_OUT_SUCCESS':
            return { ...state, currentUser: null}
        case 'SIGN_UP_FAILED':    
        case 'SIGN_IN_FAILED':
        case 'SIGN_OUT_FAILED':    
            return {...state, error: payload}
        default:
            return state
    }
}
