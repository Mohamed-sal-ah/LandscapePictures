import React, { useContext, useState, useEffect, useRef } from 'react'
import { View, Text, Image } from 'react-native'
import NavigationBar from '../../components/NavigationBar'
import { DatabaseContext, useDatabase, storageRef, databaseRef } from '../../firebase'
import { UserSvg } from '../../assets/'
import theme from '../../themes'
import useConnect from '../../hooks/useConnect'
import 'react-native-get-random-values'
import ImageGallery from '../../components/ImageGallery';
import Modal from 'react-modal'
import DeleteModal from './DeleteModal'
import * as STYLED from './styled'
import { useNavigation } from '@react-navigation/native'
import { OnAuthScreenName, screenName } from '../../navigation/routes'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: ' 10px',
        borderRadius: '10px'
    },
    overlay: {
        backgroundColor: theme.colors.gradient.regular
    }
};

const AccountScreen = () => {
    const navigation = useNavigation()
    const authUser = useConnect((state) => state.auth.user)
    const dataContext = useContext(DatabaseContext)
    const { curentData }: any = dataContext
    const { images, users } = curentData
    const { deleteImage }: any = useDatabase()
    const [imageLoading, setImageLoading] = useState(true)
    const [profilePic, setProfilePic] = useState('')
    const [filtredImages, setFiltredImages] = useState([])
    const [showGallery, setShowGallery] = useState(false)
    const [boolModal, setBoolModal] = useState(false)
    const [imageDelete, setImageDelete]: any = useState('')
    const openDeleteModal = (oneImage: any) => {
        setImageDelete(oneImage)
        setBoolModal(true)
    }
    const onCloseModal = () => {
        setImageDelete('')
        setBoolModal(false)
    }
    useEffect(() => {
        const imageFilter = images.filter((image: any) => image.user_id === authUser.uid)
        setFiltredImages(imageFilter)
        setShowGallery(true)
        if (authUser.profilePictureFile) {
            setImageLoading(false)
            setProfilePic(authUser.profilePictureFile)
        }

    }, [images])
    const onDeleteOneImage = () => {
        setBoolModal(false)
        const imagesFiltred = images.filter((image: any) => image.fileName !== imageDelete.fileName)
        databaseRef.imagesFileDatabase().child(`/${imageDelete.keyValue}`).remove().then(() => {
            storageRef.imagesStorage().child(`/${imageDelete.url_id}`).delete().then(() => {
                deleteImage(imagesFiltred)
            })
        })
    }
    return (
        <STYLED.FullPage>
            <NavigationBar />
            <Modal
                isOpen={boolModal}
                onRequestClose={() => onCloseModal()}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Delete Image"
            >
                <DeleteModal onCancel={onCloseModal} onDelete={onDeleteOneImage} />
            </Modal>
            <View style={{ marginTop: 70, flex: 1, alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
                {authUser ? <>
                    <STYLED.UserInfoView>
                        {authUser.profilePicture ? <View>
                            {!imageLoading && <>
                                <Image style={{ width: 100, height: 100, borderRadius: 100 }} source={{ uri: profilePic }} />
                            </>}
                        </View> : <STYLED.DefaultProfilePictureView>
                            <UserSvg size={50} fillColor={theme.colors.white} />
                        </STYLED.DefaultProfilePictureView>}
                        <STYLED.UserInfoTextView style={{
                            maxWidth: theme.fullWidth > 650 ? 200 : 'fit-content',
                            alignItems: theme.fullWidth > 650 ? 'flex-start' : 'center',
                            paddingLeft: theme.fullWidth > 650 ? 20 : 0
                        }}>
                            <STYLED.UserTitle>{authUser.username}</STYLED.UserTitle>
                            <STYLED.UserText
                                style={{ textAlign: theme.fullWidth > 650 ? 'left' : 'center' }}
                            >{authUser.user_info}</STYLED.UserText>
                        </STYLED.UserInfoTextView>
                    </STYLED.UserInfoView>
                    <STYLED.ButtonLink style={{ borderWidth: 2, borderColor: theme.colors.blue }} onPress={() => navigation.navigate(screenName.USER_STACK, {
                        screen: OnAuthScreenName.UPDATE_USER_INFO
                    })}>
                        <STYLED.ButtonLinkText style={{ color: theme.colors.blue }}>Change profile picture and info text</STYLED.ButtonLinkText>
                    </STYLED.ButtonLink>


                </> : <Text>Loading...</Text>
                }
                {showGallery &&
                    <>
                        {filtredImages.length > 0 ? <ImageGallery imagesArray={filtredImages} setOnAuth={true} onDeleteImage={openDeleteModal} />
                            : <STYLED.ButtonLink style={{ borderWidth: 2, borderColor: theme.colors.green_primary }} onPress={() => navigation.navigate(screenName.USER_STACK, {
                                screen: OnAuthScreenName.UPLOAD
                            })}>
                                <STYLED.ButtonLinkText style={{ color: theme.colors.green_primary }}>Click here to upload images</STYLED.ButtonLinkText>
                            </STYLED.ButtonLink>}
                    </>
                }
            </View>
        </STYLED.FullPage>
    )
}

export default AccountScreen
