import { FETCH_DATABASE, UPDATE_USER_INFO, IMAGE_UPLOADED, IMAGE_DELETED, USER_CREATED } from './types'

export type DatabaseState = {
    users: any,
    images: any[],
}

const INITIAL_STATE: DatabaseState = {
    users: null,
    images: [],
}

export default (state = INITIAL_STATE, action: any): DatabaseState => {
    switch (action.type) {
        case FETCH_DATABASE:
            return {
                ...state,
                users: action.payload.users,
                images: action.payload.images
            }
        case UPDATE_USER_INFO:
            return {
                ...state,
                users: action.payload.users,
            }
        case IMAGE_UPLOADED:
            return {
                ...state,
                images: [...state.images, action.payload.image]
            }
        case IMAGE_DELETED:
            return {
                ...state,
                images: [...action.payload.images]
            }
        case USER_CREATED:
            return {
                ...state,
                users: { ...state.users, ...action.payload.user }
            }
        case FETCH_DATABASE:
            return {
                ...state,
                users: action.payload.users,
                images: action.payload.images
            }
        default:
            return state
    }
}