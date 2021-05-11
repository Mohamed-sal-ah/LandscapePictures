import React, { useRef, useState, useContext, useEffect } from 'react'
import { UserSvg } from '../../assets/'
import { DatabaseContext, useDatabase, storageRef, databaseRef } from '../../firebase'
import * as STYLED from './styled'
import theme from '../../themes'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import { useNavigation } from '@react-navigation/native'
import useConnect from '../../hooks/useConnect'
import { OnAuthScreenName, screenName } from '../../navigation/routes'
import LoadingComponent from '../../components/LoadingComponent'

const UpdateUserInfoScreen = () => {
    const navigation = useNavigation()
    const authUser = useConnect((state) => state.auth.user)
    const hiddenFileInput: any = useRef(null)
    const { updateInfo }: any = useDatabase()
    const [user_info, setUserInfo] = useState(authUser.user_info)
    const [fileSelected, setFileSelected] = useState(authUser.profilePictureFile ? authUser.profilePictureFile : '')
    const [fileBlob, setFileBlob]: any = useState('')
    const dataContext = useContext(DatabaseContext)
    const { curentData }: any = dataContext
    const { users } = curentData
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(false)
        })
        return unsubscribe
    }, [navigation])
    const handleClickButton = () => {
        hiddenFileInput.current.click()
    }
    const onSaveUpdate = async () => {
        setLoading(true)
        const allUser = authUser
        allUser.user_info = user_info
        if (fileBlob !== '') {
            // upload image and put in new user info
            const generateID = nanoid()
            const fileId = generateID + ".jpg"
            if (users[authUser.uid].profilePictureFile) {
                await storageRef.profilePictures().child(`/${allUser.profilePicture}`).delete()
            }
            const uploadTask = storageRef.profilePictures().child(`/${fileId}`).put(fileBlob)
            await uploadTask.on(
                "state_changed",
                (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.error(error.message);
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        allUser.profilePictureFile = downloadURL
                        allUser.profilePicture = fileId
                        databaseRef.userDatabase(authUser.uid).set({
                            ...allUser,
                            profilePicture: fileId,
                            profilePictureFile: downloadURL
                        })
                        updateInfo(allUser, authUser.uid)
                    })
                }
            );

            setFileBlob('')
        } else {
            // put in new user info
            await databaseRef.userDatabase(authUser.uid).set({
                ...allUser
            })
            updateInfo(allUser, authUser.uid)
        }
        navigation.navigate(screenName.HOME)
    }
    const onChangeInput = (e: any) => {
        e.preventDefault();
        if (e.target.files.length > 0) {
            if (e.target.files[0].type === "image/jpeg") {

                const blobURL = URL.createObjectURL(e.target.files[0])
                setFileSelected(blobURL)
                setFileBlob(e.target.files[0])
            } else {
                alert("You must have jpeg image");
            }
        }

    }
    return (
        <STYLED.FullPage>
            {!loading ?
                <STYLED.FormSection>
                    <STYLED.FullTitle>Landscape Pictures</STYLED.FullTitle>
                    <STYLED.SubTitle>Update profile or small info </STYLED.SubTitle>
                    <STYLED.ProfilePictureInputView style={{ minHeight: fileSelected !== '' ? 250 : 'auto' }}>

                        {fileSelected !== '' ?
                            <STYLED.ProfilePicture source={{ uri: fileSelected }} />
                            :
                            <STYLED.DefaultProfilePictureView>
                                <UserSvg size={50} fillColor={theme.colors.white} />
                            </STYLED.DefaultProfilePictureView>
                        }
                        {fileBlob !== '' ?
                            <STYLED.Button style={{ backgroundColor: theme.colors.red }} onPress={() => {
                                setFileSelected(authUser.profilePictureFile ? authUser.profilePictureFile : '')
                                setFileBlob('')
                            }}>
                                <STYLED.ButtonText style={{ color: theme.colors.white }}>Cancel</STYLED.ButtonText>
                            </STYLED.Button>
                            :
                            <STYLED.Button style={{ borderWidth: 2, borderColor: theme.colors.blue }} onPress={() => handleClickButton()}>
                                <STYLED.ButtonText style={{ color: theme.colors.blue }}>Change profile picture</STYLED.ButtonText>
                            </STYLED.Button>
                        }
                        <input
                            ref={hiddenFileInput}
                            type="file"
                            onChange={onChangeInput}
                            style={{ display: 'none' }}
                        />
                    </STYLED.ProfilePictureInputView>
                    <STYLED.InputForm>
                        <STYLED.InputLabel>Change info about yourself:</STYLED.InputLabel>
                        <STYLED.UpdateInfoInputView style={{ minHeight: 100, justifyContent: 'flex-start' }}>
                            <STYLED.UpdateInfoInput style={{ alignSelf: 'flex-start', paddingTop: 7, height: '100%' }}
                                multiline={true} defaultValue={user_info}
                                placeholderTextColor={theme.colors.gray.light}
                                placeholder="Change user info"
                                onChangeText={setUserInfo} />
                        </STYLED.UpdateInfoInputView>
                    </STYLED.InputForm>
                    <STYLED.ButtonView>
                        <STYLED.Button style={{ borderWidth: 2, borderColor: theme.colors.blue }} onPress={() => navigation.navigate(screenName.USER_STACK, {
                            screen: OnAuthScreenName.ACCOUNT
                        })}>
                            <STYLED.ButtonText style={{ color: theme.colors.blue }}>Back</STYLED.ButtonText>
                        </STYLED.Button>
                        <STYLED.Button style={{ backgroundColor: theme.colors.green_light_secondary }} onPress={() => onSaveUpdate()}>
                            <STYLED.ButtonText style={{ color: theme.colors.white }}>Submit</STYLED.ButtonText>
                        </STYLED.Button>
                    </STYLED.ButtonView>
                </STYLED.FormSection>
                :
                <LoadingComponent />
            }
        </STYLED.FullPage>
    )
}

export default UpdateUserInfoScreen
