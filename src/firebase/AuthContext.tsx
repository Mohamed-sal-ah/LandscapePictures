import React, { useContext, useState, useEffect } from 'react'
import { auth } from './firebase'
import { userDatabase } from './databaseRefs'
import actions from '../redux/actions'
import { useDispatch } from 'react-redux'
import useConnect from '../hooks/useConnect'

export const AuthContext = React.createContext(null)

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const reduxUser = useConnect((state) => state.auth.user)
    const [currentUser, setCurrentUser] = useState()

    const signIn = (email: string, password: string) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const signOut = () => {
        return auth.signOut()
    }

    const createUser = (email: string, password: string) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const setUserData = (authUser: any) => {
        if (authUser) {
            return new Promise((resolve, reject) => {
                userDatabase(authUser.uid).once('value').then((snapshot: any) => {
                    const dbUser = snapshot.val();
                    // merge auth and db user
                    resolve({
                        uid: authUser.uid,
                        email: authUser.email,
                        ...dbUser,
                    })
                });
            })
        } else {
            return null
        }
    }

    useEffect(() => {
        // User state
        const unSubscribe = auth.onAuthStateChanged(async (authUser: any) => {
            const userInfo: any = await setUserData(authUser)
            if (reduxUser && userInfo) {
                if (reduxUser.uid === userInfo.uid) {
                    setCurrentUser(reduxUser)
                } else {
                    dispatch(actions.auth.setUserStatus(userInfo))
                    setCurrentUser(userInfo)
                }
            } else {
                dispatch(actions.auth.setUserStatus(userInfo))
                setCurrentUser(userInfo)
            }
            setLoading(false)
        })
        return unSubscribe
    }, [])

    const value: any = {
        currentUser,
        signIn,
        signOut,
        createUser
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
