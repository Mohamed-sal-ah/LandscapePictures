import React, { FC } from 'react'
import { View, TouchableOpacity } from 'react-native'
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
        <STYLED.FullView style={{ minWidth: modalWidth(theme.fullWidth) }}>
            {imageData !== '' && <>
                <STYLED.HeaderAndExitView>
                    <STYLED.HeaderAndTextView>
                        <TouchableOpacity onPress={() => onNavigateUser(imageData.user_id, imageData.username)}>
                            <STYLED.ProfilePictureView
                            >
                                {users[`${imageData.user_id}`].profilePicture ?
                                    <Image
                                        accessibilityLabel={imageData.hasOwnProperty('alt') ? imageData.alt : `Photo by ${imageData.username}`}
                                        style={{
                                            maxWidth: 44,
                                            maxHeight: 44,
                                            borderRadius: 100
                                        }} source={{ uri: users[`${imageData.user_id}`].profilePictureFile ? users[`${imageData.user_id}`].profilePictureFile : require(`../../storage/profileImage/${users[`${imageData.user_id}`].profilePicture}`) }} />
                                    :
                                    <View style={{
                                        padding: 10,
                                        borderRadius: 100,
                                        backgroundColor: theme.colors.red
                                    }}>

                                        <UserSvg fillColor={theme.colors.white} />
                                    </View>}
                            </STYLED.ProfilePictureView>
                        </TouchableOpacity>
                        <STYLED.UsernameText>{imageData.username}</STYLED.UsernameText>
                    </STYLED.HeaderAndTextView>
                    <TouchableOpacity onPress={() => closeImageModal()}>
                        <XmarkSvg fillColor={theme.colors.gray.dark} />
                    </TouchableOpacity>
                </STYLED.HeaderAndExitView>
                <Image
                    width={(Math.floor(theme.fullWidth * 0.9) % 2 == 0 ? Math.floor(theme.fullWidth * 0.9) : Math.floor(theme.fullWidth * 0.9) + 1)}
                    height={(Math.floor(theme.fullHeight * 0.7) % 2 == 0 ? Math.floor(theme.fullHeight * 0.7) : Math.floor(theme.fullHeight * 0.7) + 1)}
                    style={{ paddingBottom: 20 }}
                    source={{ uri: imageData.fileName.startsWith('https') ? imageData.fileName : require(`../../storage/images/${imageData.fileName}`) }} />
                <STYLED.InfoAndDownLoadView>
                    <STYLED.ImageInfoView>
                        <STYLED.LoactionView>
                            <View
                                style={{
                                    padding: '6px'
                                }}
                            >
                                <LocationSvg fillColor={theme.colors.black} />
                            </View>
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
                        href={imageData.fileName.startsWith('https') ? imageData.fileName : require(`../../storage/images/${imageData.fileName}`)}
                        download={imageData.fileName.startsWith('https') ? `${imageData.username}_${imageData.url_id}` : `${imageData.username}_${imageData.fileName}`}

                    >
                        <STYLED.DownLoadText>Download</STYLED.DownLoadText>
                        <View style={{
                            backgroundColor: theme.colors.green_light_secondary,
                            padding: '6px'
                        }}>
                            <ArrowDownSvg fillColor={theme.colors.white} />
                        </View>
                    </a>
                </STYLED.InfoAndDownLoadView>
            </>}

        </STYLED.FullView>
    )
}

export default ImageModal
