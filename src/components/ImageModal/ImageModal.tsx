import React, { FC } from 'react'
import { ScaledSize, TouchableOpacity, useWindowDimensions } from 'react-native'
import Image from 'react-native-scalable-image';
import theme from '../../themes';
import * as STYLED from './styled'
import { XmarkSvg, UserSvg, ArrowDownSvg, LocationSvg } from '../../assets/index'
import useConnect from '../../hooks/useConnect'

type Props = {
    closeImageModal: () => void,
    onNavigateUser: (userId: string, name: string) => void,
    imageData: any
}

const ImageModal: FC<Props> = ({ closeImageModal, onNavigateUser, imageData }) => {
     const dimensions: ScaledSize = useWindowDimensions();
    const { users } = useConnect((state) => state.data)
    const modalWidth = (width: number) => {
        if (width > 800) {
            return 800
        } else if (width > 650) {
            return '90vw'
        } else {
            return '100%'
        }
    }
    return (
        <STYLED.FullView style={{ minWidth: modalWidth(dimensions.width) }}>
            {imageData !== '' && <>
                <STYLED.HeaderAndExitView>
                    <STYLED.HeaderAndTextView>
                        <TouchableOpacity onPress={() => onNavigateUser(imageData.user_id, imageData.username)}>
                            <STYLED.ProfilePictureView
                            >
                                {users[`${imageData.user_id}`].profilePicture ?
                                    <STYLED.ProfilePicture
                                        source={{ uri: users[`${imageData.user_id}`].profilePictureFile ? users[`${imageData.user_id}`].profilePictureFile : require(`../../storage/profileImage/${users[`${imageData.user_id}`].profilePicture}`) }} />
                                    :
                                    <STYLED.DefaultProfilePictureView>

                                        <UserSvg fillColor={theme.colors.white} />
                                    </STYLED.DefaultProfilePictureView>}
                            </STYLED.ProfilePictureView>
                        </TouchableOpacity>
                        <STYLED.UsernameText>{imageData.username}</STYLED.UsernameText>
                    </STYLED.HeaderAndTextView>
                    <TouchableOpacity onPress={() => closeImageModal()}>
                        <XmarkSvg fillColor={theme.colors.gray.dark} />
                    </TouchableOpacity>
                </STYLED.HeaderAndExitView>
                <Image
                    width={(Math.floor(dimensions.width * 0.9) % 2 == 0 ? Math.floor(dimensions.width * 0.9) : Math.floor(dimensions.width * 0.9) + 1)}
                    height={(Math.floor(dimensions.height * 0.7) % 2 == 0 ? Math.floor(dimensions.height * 0.7) : Math.floor(dimensions.height * 0.7) + 1)}
                    style={{ paddingBottom: 20 }}
                    accessibilityLabel={imageData.hasOwnProperty('alt') ? imageData.alt : `Photo by ${imageData.username}`}
                    source={{ uri: imageData.hasOwnProperty('fileUrl') ? imageData.fileUrl : require(`../../storage/images/${imageData.fileName}`) }} />
                <STYLED.InfoAndDownLoadView>
                    <STYLED.ImageInfoView>
                        <STYLED.LoactionView>
                            <STYLED.LocationIconView>
                                <LocationSvg fillColor={theme.colors.black} />
                            </STYLED.LocationIconView>
                            <STYLED.ImageInfoText style={{ color: theme.colors.black }}>{imageData.location}</STYLED.ImageInfoText>
                        </STYLED.LoactionView>
                        <STYLED.ImageInfoText style={{ color: theme.colors.gray.dark, marginLeft: '36px' }}>{imageData.description}</STYLED.ImageInfoText>
                    </STYLED.ImageInfoView>
                    <a
                        style={{
                            backgroundColor: theme.colors.green_dark_trinary,
                            width: 'fit-content',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            maxWidth: 'fit-content',
                            borderRadius: '5px',
                            overflow: 'hidden',
                            textDecoration: 'none'
                        }}
                        href={imageData.hasOwnProperty('fileUrl') ? imageData.fileUrl : require(`../../storage/images/${imageData.fileName}`)}
                        download={imageData.hasOwnProperty('fileUrl') ? `${imageData.username}_${imageData.url_id}` : `${imageData.username}_${imageData.fileName}`}

                    >
                        <STYLED.DownLoadText>Download</STYLED.DownLoadText>
                        <STYLED.DownloadIconView>
                            <ArrowDownSvg fillColor={theme.colors.white} />
                        </STYLED.DownloadIconView>
                    </a>
                </STYLED.InfoAndDownLoadView>
            </>}

        </STYLED.FullView>
    )
}

export default ImageModal
