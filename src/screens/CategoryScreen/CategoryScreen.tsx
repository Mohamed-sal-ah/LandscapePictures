import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../navigation/routes'
import useConnect from '../../hooks/useConnect'
import NavigationBar from '../../components/NavigationBar'
import * as STYLED from './styled'
import ImageGallery from '../../components/ImageGallery'
import Modal from 'react-modal'
import theme from '../../themes';
import ImageModal from '../../components/ImageModal/ImageModal';

const objectText = [
    {
        category: "Forest",
        title: "Forest",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus id urna in lobortis. Nunc maximus mi at lorem sollicitudin."
    },
    {
        category: "Coast",
        title: "Coast",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus id urna in lobortis. Nunc maximus mi at lorem sollicitudin."
    },
    {
        category: "Mountains",
        title: "Mountains",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus id urna in lobortis. Nunc maximus mi at lorem sollicitudin."
    },
    {
        category: "Snow And Ice",
        title: "Snow and Ice",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus id urna in lobortis. Nunc maximus mi at lorem sollicitudin."
    },
    {
        category: "Desert",
        title: "Desert",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus id urna in lobortis. Nunc maximus mi at lorem sollicitudin."
    },
    {
        category: "Grasslands",
        title: "Grasslands",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus id urna in lobortis. Nunc maximus mi at lorem sollicitudin."
    }
]

const CategoryScreen = ({ route }: any) => {
    const navigation = useNavigation()
    const { images } = useConnect((state) => state.data)
    const [filtredImages, setFiltredImages]: any[] = useState([])
    const [categoryObject, setCategoryObject]: any = useState('')
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
            const setArray: any[] = []
            const oneObject = objectText.filter((item: any) => item.category === route.params.category)
            setCategoryObject(oneObject[0])
            images.forEach((image: any) => {
                for (let index = 0; index < image.category.length; index++) {
                    if (image.category[index] === route.params.category) {
                        setArray.push(image)

                    }
                }
            });
            setLoading(false)
            setFiltredImages([...setArray])
        } else {
            navigation.navigate(screenName.HOME)
        }
    }, [route.params])


    return (
        <STYLED.FullPage>
            <NavigationBar />
            {!loading &&
                <View style={{ marginTop: 70, flex: 1, alignItems: 'center', width: '100%' }}>
                    <STYLED.CategoryTitle>{categoryObject.title}</STYLED.CategoryTitle>
                    <STYLED.CategoryText>{categoryObject.text}</STYLED.CategoryText>
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
                    <ImageGallery onNavigateUser={onNavigateUser} openImageModal={openImageModal} imagesArray={filtredImages} />
                </View>
            }
        </STYLED.FullPage>
    )
}

export default CategoryScreen
