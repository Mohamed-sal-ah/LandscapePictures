import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../navigation/routes'
import { View } from 'react-native'
import useConnect from '../../hooks/useConnect'
import NavigationBar from '../../components/NavigationBar'
import ImageGallery from '../../components/ImageGallery';
import theme from '../../themes'
import Modal from 'react-modal'
import ImageModal from '../../components/ImageModal/ImageModal';
import { UserSvg } from '../../assets'
import * as STYLED from './styled'

const UserScreen = ({ route }: any) => {
    const navigation = useNavigation()
    const { images, users } = useConnect((state) => state.data)
    const [userPage, setUserPage]: any = useState('')
    const [filtredImages, setFiltredImages]: any[] = useState([])
    const [loading, setLoading] = useState(true)
    const [boolModal, setBoolModal] = useState(false)
    const [imageValues, setImageValues] = useState('')
    const openImageModal = (oneImageData: any) => {
        setBoolModal(true)
        setImageValues(oneImageData)
    }
    const closeImageModal = () => {
        setImageValues('')
        setBoolModal(false)
    }
    const onNavigateUser = (userId: any, name: any) => {
        setBoolModal(false)
        navigation.navigate(screenName.USER, {
            user: userId,
            username: name
        })
    }

    useEffect(() => {
        if (route.params) {
            const userFilter = Object.keys(users).filter((item: any) => item === route.params.user)
            const imageFilter = images.filter((image: any) => image.user_id === userFilter[0])
            setUserPage(users[userFilter[0]])
            setFiltredImages(imageFilter)
            setLoading(false)
        } else {
            navigation.navigate(screenName.HOME)
        }
    }, [route.params])
    return (
        <STYLED.FullPage>
            <NavigationBar />
            {!loading &&
                <STYLED.FullUserView>
                    <STYLED.UserInfoView
                        style={{
                            flexDirection: theme.fullWidth > 650 ? 'row' : 'column',
                        }}
                    >
                        {userPage.profilePicture ? <View>
                            <STYLED.ProfilePicture
                                source={{ uri: userPage.profilePictureFile ? userPage.profilePictureFile : require(`../../storage/profileImage/${userPage.profilePicture}`) }}
                            />
                        </View> : <STYLED.DefaultProfilePictureView>
                            <UserSvg size={50} fillColor={theme.colors.white} />
                        </STYLED.DefaultProfilePictureView>}
                        <STYLED.UserInfoTextView style={{
                            maxWidth: theme.fullWidth > 650 ? 200 : 'fit-content',
                            alignItems: theme.fullWidth > 650 ? 'flex-start' : 'center',
                            paddingLeft: theme.fullWidth > 650 ? 20 : 0
                        }}>
                            <STYLED.UserTitle>{userPage.username}</STYLED.UserTitle>
                            <STYLED.UserText
                                style={{ textAlign: theme.fullWidth > 650 ? 'left' : 'center' }}
                            >{userPage.user_info}</STYLED.UserText>
                        </STYLED.UserInfoTextView>
                    </STYLED.UserInfoView>
                    <Modal
                        isOpen={boolModal}
                        onRequestClose={() => setBoolModal(false)}
                        style={{
                            content: {
                                top: theme.fullWidth > 650 ? '50%' : '0',
                                left: theme.fullWidth > 650 ? '50%' : '0',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: theme.fullWidth > 650 ? '-50%' : '0',
                                transform: theme.fullWidth > 650 ? 'translate(-50%, -50%)' : 'none',
                                width: theme.fullWidth > 650 ? 'fit-content' : '100%',
                                height: theme.fullWidth > 650 ? 'fit-content' : '100%',
                                padding: 0,
                                borderRadius: theme.fullWidth > 650 ? 4 : 0,

                            },
                            overlay: {
                                backgroundColor: theme.colors.gradient.regular
                            }
                        }}
                        ariaHideApp={false}
                        contentLabel="Example Modal"
                    >
                        <ImageModal imageData={imageValues} onNavigateUser={onNavigateUser} closeImageModal={closeImageModal} />
                    </Modal>
                    <ImageGallery onNavigateUser={onNavigateUser} openImageModal={openImageModal} imagesArray={filtredImages} setOnAuth={false} />
                </STYLED.FullUserView>}
        </STYLED.FullPage>
    )
}

export default UserScreen
