import React, { useState, } from 'react'
import { TouchableOpacity } from 'react-native'
import theme from '../../themes'
import * as STYLED from './styled'
import { LoginScreenName, OnAuthScreenName, screenName } from '../../navigation/routes'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../firebase'
import useConnect from '../../hooks/useConnect'
import SearchBar from '../SearchBar'
import { HamburgerBar } from '../../assets'
import NavigationModal from './NavigationModal'

type Props = {
    searchResult: string,
    showSearchBar: boolean,
}
const NavigationBar = ({ showSearchBar = true, searchResult = '' }: Partial<Props>) => {
    const [boolModal, setBoolModal] = useState(false)
    const navigation = useNavigation()
    const { signOut }: any = useAuth()
    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;

        if (offset > theme.fullHeight) {
            setScrolled(true);
        }
        else {
            setScrolled(false);
        }
    }

    const isAuth = useConnect((state) => state.auth.user)

    const onSignOut = async () => {
        await signOut().then(() => {
            navigation.navigate(screenName.LOGIN_STACK,
                {
                    screen: LoginScreenName.SIGN_IN
                })
        }).catch((error: any) => {
            console.error(error.message);
        })
    }
    return (<>
        <STYLED.FullViewNavigation>
            <TouchableOpacity onPress={() => navigation.navigate(screenName.HOME)}>
                <STYLED.TitlePage style={{ fontSize: theme.fullWidth > 650 ? 35 : 30 }}>{theme.fullWidth > 650 ? 'Landscape Pictures' : 'LP'}</STYLED.TitlePage>
            </TouchableOpacity>
            {scrolled || showSearchBar || theme.fullWidth < 650 ?
                <SearchBar searchResult={searchResult} /> : null
            }

            {theme.fullWidth > 1060 ? <STYLED.NavigationSection>
                <STYLED.NavigationLinks>
                    <STYLED.LinksText onPress={() => navigation.navigate(screenName.EXPLORE)}>Explore</STYLED.LinksText>
                </STYLED.NavigationLinks>
                <STYLED.NavigationLinks onPress={() => navigation.navigate(screenName.ABOUT)}>
                    <STYLED.LinksText>About us</STYLED.LinksText>
                </STYLED.NavigationLinks>
                {isAuth !== null ?
                    <>
                        <STYLED.NavigationLinks onPress={() => navigation.navigate(screenName.USER_STACK, {
                            screen: OnAuthScreenName.UPLOAD
                        })}>
                            <STYLED.LinksText>Upload</STYLED.LinksText>
                        </STYLED.NavigationLinks>
                        <STYLED.NavigationLinks onPress={() => navigation.navigate(screenName.USER_STACK, {
                            screen: OnAuthScreenName.ACCOUNT
                        })}>
                            <STYLED.LinksText>Account</STYLED.LinksText>
                        </STYLED.NavigationLinks>
                        <STYLED.NavigationLinks onPress={() => onSignOut()} style={{ backgroundColor: theme.colors.blue, borderRadius: 7 }}>
                            <STYLED.LinksText style={{ color: theme.colors.white }}>Sign out</STYLED.LinksText>
                        </STYLED.NavigationLinks>
                    </>
                    :
                    <>
                        <STYLED.NavigationLinks onPress={() => navigation.navigate(screenName.LOGIN_STACK,
                            { screen: LoginScreenName.SIGN_IN }
                        )}>
                            <STYLED.LinksText>Sign in</STYLED.LinksText>
                        </STYLED.NavigationLinks>
                        <STYLED.NavigationLinks onPress={() => navigation.navigate(screenName.LOGIN_STACK, {
                            screen: LoginScreenName.SIGN_UP
                        })} style={{ backgroundColor: theme.colors.green_light_secondary, borderRadius: 7 }}>
                            <STYLED.LinksText style={{ color: theme.colors.white }}>Join us</STYLED.LinksText>
                        </STYLED.NavigationLinks>
                    </>
                }
            </STYLED.NavigationSection> :
                <TouchableOpacity onPress={() => setBoolModal(!boolModal)} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <HamburgerBar fillColor={theme.colors.gray.dark} size={theme.fullWidth > 600 ? 25 : 20} />
                </TouchableOpacity>
            }
        </STYLED.FullViewNavigation>
        {boolModal &&
            <STYLED.ModalView>
                <NavigationModal setBoolModal={setBoolModal} isAuth={isAuth} signOut={onSignOut} />
            </STYLED.ModalView>
        }
    </>
    )
}

export default NavigationBar

