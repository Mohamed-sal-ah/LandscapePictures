import React, { useRef, FC } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Image from 'react-native-scalable-image';
import theme from '../../../themes';
import * as STYLED from './styled'
import { useHover } from 'react-native-web-hooks';
import { XmarkSvg, UserSvg, ArrowDownSvg } from '../../../assets/index'
import useConnect from '../../../hooks/useConnect'

type Props = {
    fullWidth: number,
    oneImage: any,
    setOnAuth: any,
    onDeleteImage: any,
    onNavigateUser: any,
    openImageModal: any,
}

const ImageItem: FC<Props> = ({ fullWidth, oneImage, setOnAuth, onDeleteImage = null, onNavigateUser = null, openImageModal = null }: any) => {
    const ref = useRef(null);
    const isHovered = useHover(ref);
    const { users } = useConnect((state) => state.data)
    const onPressUser = (e: any) => {
        e.stopPropagation()
        onNavigateUser(oneImage.user_id, oneImage.username)
    }
    return (
        <STYLED.ItemView style={{
            borderTopWidth: fullWidth > 650 ? 0 : 3,
            borderTopColor: theme.colors.gray.light
        }} onPress={() => openImageModal !== null && openImageModal(oneImage)}>
            <STYLED.MobileViewUserInfo style={{ display: fullWidth > 650 ? 'none' : 'flex' }}>
                <STYLED.ProfilePictureView
                    onPress={() => onPressUser !== null && onPressUser}
                >
                    {users[`${oneImage.user_id}`].profilePicture ?
                        <Image
                            accessibilityLabel={oneImage.hasOwnProperty('alt') ? oneImage.alt : `Photo by ${oneImage.username}`}
                            style={{
                                maxWidth: 60,
                                maxHeight: 60,
                                borderRadius: 100
                            }} source={{ uri: users[`${oneImage.user_id}`].profilePictureFile ? users[`${oneImage.user_id}`].profilePictureFile : require(`../../../storage/profileImage/${users[`${oneImage.user_id}`].profilePicture}`) }} />
                        :
                        <View style={{
                            padding: 10,
                            borderRadius: 100,
                            backgroundColor: theme.colors.red
                        }}>

                            <UserSvg fillColor={theme.colors.white} />
                        </View>}
                </STYLED.ProfilePictureView>
                <STYLED.UsernameText style={{ color: theme.colors.gray.dark, fontSize: 20 }}>{oneImage.username}</STYLED.UsernameText>
                {setOnAuth &&
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.colors.red,
                            position: "absolute",
                            borderRadius: 5,
                            padding: '8px',
                            marginTop: '5px',
                            marginRight: "10px",
                            right: 0
                        }}
                        onPress={() => onDeleteImage(oneImage)}>
                        <XmarkSvg fillColor={theme.colors.white} />
                    </TouchableOpacity>
                }
            </STYLED.MobileViewUserInfo>
            <Image width={(Math.floor(theme.fullWidth / 2 - 20) % 2 == 0 ? Math.floor(theme.fullWidth / 2 - 20) : Math.floor(theme.fullWidth / 2 - 20) + 1)}
                height={500}
                style={{ minWidth: '100%', minHeight: 300 }}
                source={{ uri: oneImage.fileName.startsWith('https') ? oneImage.fileName : require(`../../../storage/images/${oneImage.fileName}`) }}
            />
            <STYLED.GradientImageView
                style={fullWidth > 650 ? [isHovered && styles.hover] : { display: 'none' }}
                ref={ref}
            >
                {setOnAuth ?
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.colors.red,
                            position: "absolute",
                            borderRadius: 5,
                            padding: '6px',
                            marginTop: '5px',
                            marginRight: "10px",
                            right: 0
                        }}
                        onPress={() => onDeleteImage(oneImage)}>
                        <XmarkSvg fillColor={theme.colors.white} />
                    </TouchableOpacity>
                    :
                    <>
                        <STYLED.UserProfileView>
                            <STYLED.ProfilePictureView
                                onPress={() => onPressUser !== null && onPressUser}
                            >
                                {users[`${oneImage.user_id}`].profilePicture ?
                                    <Image style={{
                                        maxWidth: 44,
                                        maxHeight: 44,
                                        borderRadius: 100
                                    }} source={{ uri: users[`${oneImage.user_id}`].profilePictureFile ? users[`${oneImage.user_id}`].profilePictureFile : require(`../../../storage/profileImage/${users[`${oneImage.user_id}`].profilePicture}`) }} />
                                    :
                                    <View style={{
                                        padding: 10,
                                        borderRadius: 100,
                                        backgroundColor: theme.colors.red
                                    }}>

                                        <UserSvg fillColor={theme.colors.white} />
                                    </View>}
                            </STYLED.ProfilePictureView>
                            <STYLED.UsernameText style={{ color: theme.colors.white, fontSize: 15 }}>{oneImage.username}</STYLED.UsernameText>
                        </STYLED.UserProfileView>
                        <a style={{
                            backgroundColor: theme.colors.white,
                            padding: '5px',
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            margin: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '5px',
                        }}
                            onClick={(e: any) => e.stopPropagation()}
                            href={oneImage.fileName.startsWith('https') ? oneImage.fileName : require(`../../../storage/images/${oneImage.fileName}`)}
                            download={oneImage.fileName.startsWith('https') ? `${oneImage.username}_${oneImage.url_id}` : `${oneImage.username}_${oneImage.fileName}`}
                        >
                            <ArrowDownSvg fillColor={theme.colors.gray.dark} />
                        </a>
                    </>
                }
            </STYLED.GradientImageView>
            <STYLED.MobileViewUserInfo style={{ display: fullWidth > 650 ? 'none' : 'flex', justifyContent: 'space-between' }}>
                <STYLED.MobileViewUserInfoText>
                    {oneImage.description}
                </STYLED.MobileViewUserInfoText>
                <a style={{
                    backgroundColor: theme.colors.white,
                    padding: '5px',
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    borderColor: theme.colors.gray.dark,
                    borderWidth: '3px',
                    borderStyle: 'solid',
                    marginLeft: '10px'
                }}
                    onClick={(e: any) => e.stopPropagation()}
                    href={oneImage.fileName.startsWith('https') ? oneImage.fileName : require(`../../../storage/images/${oneImage.fileName}`)}
                    download={oneImage.fileName.startsWith('https') ? `${oneImage.username}_${oneImage.url_id}` : `${oneImage.username}_${oneImage.fileName}`}
                >
                    <ArrowDownSvg fillColor={theme.colors.gray.dark} />
                </a>
            </STYLED.MobileViewUserInfo>
        </STYLED.ItemView>
    )
}

const styles = StyleSheet.create({
    hover: {
        opacity: 1,
    },
})

export default ImageItem
