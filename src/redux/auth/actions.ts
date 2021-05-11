import { SET_USER_STATUS } from './types'

export const setUserStatus = (user: any) => ({
    type: SET_USER_STATUS,
    payload: {
        user,
    }
})

