import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import * as STYLED from './styled'
import ImageItem from './ImageItem';
import theme from '../../themes';

type Props = {
    onDeleteImage: (oneImage: any) => void,
    setOnAuth: boolean,
    onNavigateUser: (userId: string, name: string) => void,
    openImageModal: (oneImageData: any) => void,
    imagesArray: any
}


const ImageGallery = ({ imagesArray, setOnAuth, onDeleteImage, onNavigateUser, openImageModal }: Partial<Props>) => (
    <STYLED.ImagesList
        style={{
            paddingRight: theme.fullWidth > 650 ? 10 : 0,
            paddingLeft: theme.fullWidth > 650 ? 10 : 0
        }}
    >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 650: 2, 900: 3 }}>
            <Masonry columnsCount={3} gutter='10px'>
                {imagesArray.map((oneImage: any, index: number) => (
                    <ImageItem
                        openImageModal={openImageModal}
                        oneImage={oneImage}
                        setOnAuth={setOnAuth}
                        onDeleteImage={onDeleteImage}
                        onNavigateUser={onNavigateUser}
                        fullWidth={theme.fullWidth}
                        key={index}
                    />
                ))}
            </Masonry>
        </ResponsiveMasonry>
    </STYLED.ImagesList>
)


export default ImageGallery
