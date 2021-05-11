import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../navigation/routes'
import useConnect from '../../hooks/useConnect'
import NavigationBar from '../../components/NavigationBar'
import ImageGallery from '../../components/ImageGallery';
import * as STYLED from './styled'
import CategorySelect from '../../components/CategorySelect'
import Modal from 'react-modal'
import theme from '../../themes';
import ImageModal from '../../components/ImageModal/ImageModal';

const SearchResultScreen = ({ route }: any) => {
    const navigation = useNavigation()
    const { images } = useConnect((state) => state.data)
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
            const newKey = ["description", "location", "category"]
            const filterArray = images.filter((item: any, index: number) => newKey.some(k => {
                if (k === "category") {
                    const returnValue = item[k].filter((category: any) => category.toLowerCase().includes(route.params.search.toLowerCase()))
                    return returnValue.length > 0
                } else {
                    return item[k].toLowerCase().includes(route.params.search.toLowerCase())
                }
            }))
            setFiltredImages(filterArray)
            setLoading(false)
        } else {
            navigation.navigate(screenName.HOME)
        }
    }, [route.params])
    return (
        <STYLED.FullPage>
            {!loading &&
                <>
                    <NavigationBar searchResult={route.params.search} />
                    <View style={{
                        marginTop: 70,
                        flex: 1,
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        {filtredImages.length > 0 ? <>
                            <STYLED.SearchResultText
                                style={{ fontSize: theme.fullWidth > 650 ? 30 : 15 }}
                            >Search Result for {route.params.search}</STYLED.SearchResultText>
                            <CategorySelect />
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
                            <ImageGallery imagesArray={filtredImages} onNavigateUser={onNavigateUser} openImageModal={openImageModal} setOnAuth={false} />
                        </>
                            :
                            <View style={{
                                height: "100%",
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <STYLED.SearchResultText>Sorry couldn't find results for {route.params.search}</STYLED.SearchResultText>
                            </View>
                        }
                    </View>
                </>
            }
        </STYLED.FullPage >
    )
}

export default SearchResultScreen
