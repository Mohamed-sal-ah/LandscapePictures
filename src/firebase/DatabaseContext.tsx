import React, { useContext, useState, useEffect } from 'react'
import { imagesFileDatabase, usersDatabase } from './databaseRefs'
import { imagesStorage, profilePictures } from './storageRefs'
import actions from '../redux/actions'
import { useDispatch } from 'react-redux'
import useConnect from '../hooks/useConnect'
import JsonData from '../data/index.json'

export const DatabaseContext = React.createContext(null)

export const useDatabase = () => {
    return useContext(DatabaseContext)
}


export const DatabaseProvider = ({ children }: any) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { images, users } = useConnect((state) => state.data)
    const [curentData, setCurrentData]: any = useState({
        images: null,
        users: null
    })
    const fetchImages = (fullUsers: any) => {
        // Fetch images
        const setJson = {
            images: JsonData.images,
            users: JsonData.users
        }
        let fullImages: any;
        imagesFileDatabase().once('value').then((snapshot: any) => {
            if (snapshot.val()) {
                const imageValues = Object.values(snapshot.val())
                const keyValues = Object.keys(snapshot.val())
                const newObj = imageValues.map((item: any, index: any) => ({
                    ...item,
                    keyValue: keyValues[index]
                }))
                fullImages = [...setJson.images, ...newObj]
                dispatch(actions.database.fetchDatabase({ images: fullImages, users: fullUsers }))
                setCurrentData({
                    images: fullImages,
                    users: fullUsers
                })
                setLoading(false)
            } else {
                dispatch(actions.database.fetchDatabase({ images: setJson.images, users: fullUsers }))
                setCurrentData({
                    images: setJson.images,
                    users: fullUsers
                })
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        // Fetch users
        const setJson = {
            images: JsonData.images,
            users: JsonData.users
        }
        let fullUsers: any;
        usersDatabase().once('value').then((snapshot: any) => {
            const usersObj = snapshot.val()
            if (usersObj) {
                fullUsers = { ...setJson.users, ...usersObj }
            } else {
                fullUsers = setJson.users
            }
        }).then(() => {
            fetchImages(fullUsers)
        }).catch((error: any) => {
            console.error(error)
        })
    }, [])

    const deleteImage = (filtredImages: any) => {
        // Delete image
        setCurrentData({
            images: filtredImages,
            users: curentData.users
        })
        dispatch(actions.database.imageDeleted(filtredImages))
    }

    const updateInfo = (userInfo: any, user_id_key: any) => {
        // update user info
        dispatch(actions.auth.setUserStatus({ ...userInfo }))
        const allUsers = curentData.users
        const restUsers = userInfo
        delete restUsers.uid
        for (let index = 0; index < Object.keys(allUsers).length; index++) {
            if (Object.keys(allUsers)[index] === user_id_key) {
                allUsers[Object.keys(allUsers)[index]] = {
                    ...restUsers
                }
            }
        }
        setCurrentData({
            images: curentData.images,
            users: allUsers
        })
        dispatch(actions.database.updateUserInfo(allUsers))
    }
    const addNewUser = (newUser: any) => {
        // add new user
        const newObj = {
            ...curentData.users,
            ...newUser
        }
        setCurrentData({
            images: curentData.images,
            users: newObj
        })
        dispatch(actions.database.createUser(newUser))
    }

    const uploadImage = (data: any) => {
        // upload image
        const newImages = [...curentData.images, { ...data }]
        setCurrentData({
            images: newImages,
            users: curentData.users
        })
        dispatch(actions.database.imageUpload(data))
    }

    const value: any = {
        curentData,
        updateInfo,
        uploadImage,
        addNewUser,
        deleteImage
    }


    return (
        <DatabaseContext.Provider value={value}>
            {!loading && children}
        </DatabaseContext.Provider>
    )
}