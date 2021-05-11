import { SET_USER_STATUS } from './types'

export type AuthState = {
    user: any,
}

const INITIAL_STATE: AuthState = {
    user: ''
}

export default (state = INITIAL_STATE, action: any): AuthState => {
    switch (action.type) {
        case SET_USER_STATUS:
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state
    }
}