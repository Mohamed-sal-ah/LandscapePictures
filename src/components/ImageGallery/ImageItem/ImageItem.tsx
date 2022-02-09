import React, { useRef, FC } from 'react'
import { ScaledSize, StyleSheet, useWindowDimensions } from 'react-native'
import Image from 'react-native-scalable-image';
import theme from '../../../themes';
import * as STYLED from './styled'
import { useHover } from 'react-native-web-hooks';
import { XmarkSvg, UserSvg, ArrowDownSvg } from '../../../assets/index'

type Props = {
    users: any,
    oneImage: any,
    setOnAuth: any,
    onDeleteImage: any,
    onNavigateUser: any,
    openImageModal: any,
}

const ImageItem: FC<Props> = ({  users, oneImage, setOnAuth, onDeleteImage = null, onNavigateUser = null, openImageModal = null }: any) => {
    const dimensions: ScaledSize = useWindowDimensions();
    const ref = useRef(null);
    const isHovered = useHover(ref);
    const onPressUser = (e: any) => {
        e.stopPropagation()
        onNavigateUser(oneImage.user_id, oneImage.username)
    }
    return (
        <STYLED.ItemView style={{
            borderTopWidth: dimensions.width > 650 ? 0 : 3,
            borderTopColor: theme.colors.gray.light
        }} onPress={() => openImageModal !== null && openImageModal(oneImage)}>
            <STYLED.MobileViewUserInfo style={{ display: dimensions.width > 650 ? 'none' : 'flex' }}>
                <STYLED.ProfilePictureView
                    onPress={() => onPressUser !== null && onPressUser}
                >
                    {users[`${oneImage.user_id}`].profilePicture ?
                        <STYLED.ProfilePicture source={{ uri: users[`${oneImage.user_id}`].profilePictureFile ? users[`${oneImage.user_id}`].profilePictureFile : require(`../../../storage/profileImage/${users[`${oneImage.user_id}`].profilePicture}`) }} />
                        :
                        <STYLED.DefaultProfilePictureView>
                            <UserSvg fillColor={theme.colors.white} />
                        </STYLED.DefaultProfilePictureView>}
                </STYLED.ProfilePictureView>
                <STYLED.UsernameText style={{ color: theme.colors.gray.dark, fontSize: 20 }}>{oneImage.username}</STYLED.UsernameText>
                {setOnAuth &&
                    <STYLED.DeleteButton
                        onPress={() => onDeleteImage(oneImage)}>
                        <XmarkSvg fillColor={theme.colors.white} />
                    </STYLED.DeleteButton>
                }
            </STYLED.MobileViewUserInfo>
            <Image width={(Math.floor(dimensions.width / 2 - 20) % 2 == 0 ? Math.floor(dimensions.width / 2 - 20) : Math.floor(dimensions.width / 2 - 20) + 1)}
                height={500}
                accessibilityLabel={oneImage.hasOwnProperty('alt') ? oneImage.alt : `Photo by ${oneImage.username}`}
                style={{ minWidth: '100%', minHeight: 300 }}
                source={{ uri: oneImage.hasOwnProperty('fileUrl') ? oneImage.fileUrl : require(`../../../storage/images/${oneImage.fileName}`) }}
            />
            <STYLED.GradientImageView
                style={dimensions.width > 650 ? [isHovered && styles.hover] : { display: 'none' }}
                ref={ref}
            >
                {setOnAuth ?
                    <STYLED.DeleteButton
                        onPress={() => onDeleteImage(oneImage)}>
                        <XmarkSvg fillColor={theme.colors.white} />
                    </STYLED.DeleteButton>
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
                                    <STYLED.DefaultProfilePictureView>
                                        <UserSvg fillColor={theme.colors.white} />
                                    </STYLED.DefaultProfilePictureView>}
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
                            href={oneImage.hasOwnProperty('fileUrl') ? oneImage.fileUrl : require(`../../../storage/images/${oneImage.fileName}`)}
                            download={oneImage.hasOwnProperty('fileUrl') ? `${oneImage.username}_${oneImage.fileName}` : `${oneImage.username}_${oneImage.fileName}`}
                        >
                            <ArrowDownSvg fillColor={theme.colors.gray.dark} />
                        </a>
                    </>
                }
            </STYLED.GradientImageView>
            <STYLED.MobileViewUserInfo style={{ display: dimensions.width > 650 ? 'none' : 'flex', justifyContent: 'space-between' }}>
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
                    href={oneImage.hasOwnProperty('fileUrl') ? oneImage.fileUrl : require(`../../../storage/images/${oneImage.fileName}`)}
                    download={oneImage.hasOwnProperty('fileUrl') ? `${oneImage.username}_${oneImage.url_id}` : `${oneImage.username}_${oneImage.fileName}`}
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
