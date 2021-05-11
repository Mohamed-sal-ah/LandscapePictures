import React from 'react'
import { TouchableOpacity } from 'react-native'
import * as STYLED from './styled'
import { useNavigation } from '@react-navigation/native'
import { LoginScreenName, OnAuthScreenName, screenName } from '../../../navigation/routes'

const NavigationModal = ({ isAuth, signOut, setBoolModal }: any) => {
    const navigation = useNavigation()
    return (
        <STYLED.FullNavigationModal>
            <TouchableOpacity onPress={() => {
                setBoolModal(false)
                navigation.navigate(screenName.EXPLORE)
            }}>
                <STYLED.LinksText>Explore</STYLED.LinksText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setBoolModal(false)
                navigation.navigate(screenName.ABOUT)
            }}>
                <STYLED.LinksText>About us</STYLED.LinksText>
            </TouchableOpacity>
            {isAuth !== null ?
                <>
                    <TouchableOpacity onPress={() => {
                        setBoolModal(false)
                        navigation.navigate(screenName.USER_STACK,
                            { screen: OnAuthScreenName.ACCOUNT }
                        )
                    }}>
                        <STYLED.LinksText>Account</STYLED.LinksText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setBoolModal(false)
                        navigation.navigate(screenName.USER_STACK,
                            { screen: OnAuthScreenName.UPLOAD }
                        )
                    }
                    }>
                        <STYLED.LinksText>Upload</STYLED.LinksText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setBoolModal(false)
                        signOut()
                    }
                    }>
                        <STYLED.LinksText>Sign out</STYLED.LinksText>
                    </TouchableOpacity>
                </>
                :
                <>
                    <TouchableOpacity onPress={() => {
                        setBoolModal(false)
                        navigation.navigate(screenName.LOGIN_STACK,
                            { screen: LoginScreenName.SIGN_IN }
                        )
                    }}>
                        <STYLED.LinksText>Sign in</STYLED.LinksText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setBoolModal(false)
                        navigation.navigate(screenName.LOGIN_STACK,
                            { screen: LoginScreenName.SIGN_UP }
                        )
                    }}>
                        <STYLED.LinksText>Join us</STYLED.LinksText>
                    </TouchableOpacity>
                </>
            }
        </STYLED.FullNavigationModal>
    )
}

export default NavigationModal
