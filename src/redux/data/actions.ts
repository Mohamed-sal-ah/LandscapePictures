import { FETCH_DATABASE, UPDATE_USER_INFO, USER_CREATED, IMAGE_UPLOADED, IMAGE_DELETED } from './types'

export const fetchDatabase = ({ users, images }: any) => ({
    type: FETCH_DATABASE,
    payload: {
        users,
        images
    }
})

export const updateUserInfo = (users: any) => ({
    type: UPDATE_USER_INFO,
    payload: {
        users
    }
})
export const createUser = (user: any) => ({
    type: USER_CREATED,
    payload: {
        user
    }
})

export const imageUpload = (image: any) => ({
    type: IMAGE_UPLOADED,
    payload: {
        image
    }
})

export const imageDeleted = (images: any) => ({
    type: IMAGE_DELETED,
    payload: {
        images
    }
})