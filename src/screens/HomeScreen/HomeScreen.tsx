import React, { useContext, useState, FC } from 'react'
import { View } from 'react-native'
import NavigationBar from '../../components/NavigationBar';
import * as STYLED from './styled'
import SearchBar from '../../components/SearchBar';
import CategorySelect from '../../components/CategorySelect';
import { DatabaseContext } from '../../firebase'
import ImageGallery from '../../components/ImageGallery';
import Modal from 'react-modal'
import theme from '../../themes';
import ImageModal from '../../components/ImageModal/ImageModal';
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../navigation/routes'


const HomeScreen: FC = () => {
    const data = useContext(DatabaseContext)
    const { curentData }: any = data
    const { images } = curentData
    const firstImage = images[0]
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
    const navigation = useNavigation()
    const onNavigateUser = (userId: string, name: string) => {
        setBoolModal(false)
        navigation.navigate(screenName.USER, {
            user: userId,
            username: name
        })
    }

    return (
        <View>
            <NavigationBar showSearchBar={false} />
            <STYLED.FullImageView>
                <STYLED.HomePageImage accessibilityLabel={firstImage.hasOwnProperty('alt') ? firstImage.alt : `Photo by ${firstImage.username}`} source={{ uri: firstImage.fileName.startsWith('https') ? firstImage.fileName : require(`../../storage/images/${firstImage.fileName}`) }} />
                <STYLED.CenterPositionView style={{ justifyContent: theme.fullWidth > 650 ? 'center' : 'flex-end' }}>
                    <STYLED.BackgroundView style={{
                        borderRadius: theme.fullWidth > 650 ? 15 : 0,
                        alignItems: theme.fullWidth > 650 ? 'flex-start' : 'center',
                        width: theme.fullWidth > 650 ? 'fit-content' : '100%',
                        padding: theme.fullWidth > 650 ? 30 : 10
                    }}>
                        <STYLED.BackgroundTitle style={{ fontSize: theme.fullWidth > 650 ? 36 : 30 }}>Landscape Pictures</STYLED.BackgroundTitle>
                        <STYLED.BackgroundText style={{ fontSize: theme.fullWidth > 650 ? 15 : 12 }}>This is where you can find beautiful photos of nature</STYLED.BackgroundText>
                        {theme.fullWidth > 650 &&
                            <SearchBar widthStyle={'100%'} />
                        }
                    </STYLED.BackgroundView>
                </STYLED.CenterPositionView>
                <STYLED.BackgroundImageInfo
                    style={{ display: theme.fullWidth > 650 ? 'flex' : 'none' }}
                >
                    <STYLED.BackgroundText>
                        Picture taken by {firstImage.username}
                    </STYLED.BackgroundText>
                    <STYLED.BackgroundText>
                        {firstImage.location}
                    </STYLED.BackgroundText>
                </STYLED.BackgroundImageInfo>
            </STYLED.FullImageView>
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
            <CategorySelect />
            <ImageGallery
                openImageModal={openImageModal}
                imagesArray={images}
                setOnAuth={false}
                onNavigateUser={onNavigateUser}
            />
        </View>
    )
}

export default HomeScreen
