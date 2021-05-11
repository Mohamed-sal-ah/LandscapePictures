import React, { useState, useRef, useEffect } from 'react'
import { screenName } from '../../navigation/routes'
import { useNavigation } from '@react-navigation/native'
import { Text, Image } from 'react-native'
import { useAuth, databaseRef, storageRef, useDatabase } from '../../firebase'
import { UserSvg } from '../../assets/'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import * as STYLED from './styled'
import theme from '../../themes'
import LoadingComponent from '../../components/LoadingComponent'

const SignUpScreen = () => {
    const { createUser }: any = useAuth()
    const { addNewUser }: any = useDatabase()
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [username, setUsername] = useState('')
    const [user_info, setUserInfo] = useState('')
    const [fileSelected, setFileSelected] = useState('')
    const [fileBlob, setFileBlob]: any = useState('')
    const navigation = useNavigation()
    const hiddenFileInput: any = useRef(null)
    const emailRef: any = useRef(null)
    const passwordRef: any = useRef(null)
    const password2Ref: any = useRef(null)
    const usernameRef: any = useRef(null)
    const userInfoRef: any = useRef(null)
    const [loading, setLoading] = useState(false)
    const handleClickButton = () => {
        hiddenFileInput.current.click()
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
    const onCreateUser = async () => {
        setLoading(true)
        let clearError: any = null
        if (fileSelected !== '') {
            const generateID = nanoid()
            const fileId = generateID + ".jpg"
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
                        createUser(email, password).then((authUser: any) => {
                            const newObj = {
                                [`${authUser.user.uid}`]: {
                                    email,
                                    username,
                                    uid: authUser.user.uid,
                                    user_info,
                                    profilePictureFile: downloadURL,
                                    profilePicture: fileId
                                }
                            }
                            addNewUser(newObj)
                            return databaseRef.userDatabase(authUser.user.uid).set({
                                email,
                                username,
                                uid: authUser.user.uid,
                                user_info,
                                profilePictureFile: downloadURL,
                                profilePicture: fileId
                            })
                        }).then(() => {
                            navigation.navigate(screenName.HOME)
                        }).catch((error: any) => {
                            setLoading(false)
                            setError(error)
                            clearError = error
                            console.error(error.message);
                        })
                    })
                }
            );
        } else {
            await createUser(email, password).then((authUser: any) => {
                const newObj = {
                    [`${authUser.user.uid}`]: {
                        email,
                        username,
                        uid: authUser.user.uid,
                        user_info,
                    }
                }
                addNewUser(newObj)
                return databaseRef.userDatabase(authUser.user.uid).set({
                    email,
                    username,
                    uid: authUser.user.uid,
                    user_info,
                })
            }).then(() => {
                navigation.navigate(screenName.HOME)
            }).catch((error: any) => {
                setLoading(false)
                setError(error)
                clearError = error
                console.error(error.message);
            })
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setFileSelected('')
            setFileBlob('')
            setLoading(false)
        })
        return unsubscribe
    }, [navigation])
    const setDisabled = password !== password2 || password === '' || password2 === '' || email === '' || username === ''
    return (
        <STYLED.FullPage>
            {!loading ?

                <STYLED.FormSection>
                    <STYLED.FullTitle>Landscape Pictures</STYLED.FullTitle>
                    <STYLED.SubTitle>Create your account</STYLED.SubTitle>
                    <STYLED.ProfilePictureInputView style={{ minHeight: fileSelected !== '' ? 250 : 'auto' }}>

                        {fileSelected !== '' ?
                            <Image style={{ width: 100, height: 100, borderRadius: 100 }} source={{ uri: fileSelected }} />
                            :
                            <STYLED.DefaultProfilePictureView>
                                <UserSvg size={50} fillColor={theme.colors.white} />
                            </STYLED.DefaultProfilePictureView>
                        }
                        {fileSelected !== '' ?
                            <STYLED.Button style={{ backgroundColor: theme.colors.red }} onPress={() => {
                                setFileSelected('')
                                setFileBlob('')
                            }}>
                                <STYLED.ButtonText style={{ color: theme.colors.white }}>Cancel</STYLED.ButtonText>
                            </STYLED.Button>
                            :
                            <STYLED.Button style={{ borderWidth: 2, borderColor: theme.colors.blue }} onPress={() => handleClickButton()}>
                                <STYLED.ButtonText style={{ color: theme.colors.blue }}>Add profile picture</STYLED.ButtonText>
                            </STYLED.Button>
                        }
                        <input
                            ref={hiddenFileInput}
                            type="file"
                            onChange={onChangeInput}
                            style={{ display: 'none' }}
                        />
                    </STYLED.ProfilePictureInputView>
                    <STYLED.InputForm accessibilityRole='form'>
                        <STYLED.InputLabel>Email:</STYLED.InputLabel>
                        <STYLED.SignUpInputView>
                            <STYLED.SignUpInput ref={emailRef} placeholderTextColor={theme.colors.gray.light} placeholder="Set Email" onChangeText={setEmail} />
                        </STYLED.SignUpInputView>
                        <STYLED.InputLabel>Username:</STYLED.InputLabel>
                        <STYLED.SignUpInputView>
                            <STYLED.SignUpInput ref={usernameRef} placeholderTextColor={theme.colors.gray.light} placeholder="Set Username" onChangeText={setUsername} />
                        </STYLED.SignUpInputView>
                        <STYLED.InputLabel>Small info about yourself:</STYLED.InputLabel>
                        <STYLED.SignUpInputView style={{ minHeight: 100, justifyContent: 'flex-start' }}>
                            <STYLED.SignUpInput ref={userInfoRef} style={{ alignSelf: 'flex-start', paddingTop: 7, height: '100%' }} multiline={true} placeholderTextColor={theme.colors.gray.light} placeholder="Set info" onChangeText={setUserInfo} />
                        </STYLED.SignUpInputView>
                        <STYLED.InputLabel>Password:</STYLED.InputLabel>
                        <STYLED.SignUpInputView>
                            <STYLED.SignUpInput ref={passwordRef} placeholderTextColor={theme.colors.gray.light} placeholder="Set Password" secureTextEntry={true} onChangeText={setPassword} />
                        </STYLED.SignUpInputView>
                        <STYLED.InputLabel>Confirm password:</STYLED.InputLabel>
                        <STYLED.SignUpInputView>
                            <STYLED.SignUpInput ref={password2Ref} placeholderTextColor={theme.colors.gray.light} placeholder="Confirm Password" secureTextEntry={true} onChangeText={setPassword2} />
                        </STYLED.SignUpInputView>
                    </STYLED.InputForm>
                    {error && <Text>{error?.message}</Text>}
                    <STYLED.ButtonView>
                        <STYLED.Button style={{ borderWidth: 2, borderColor: theme.colors.blue }} onPress={() => navigation.navigate(screenName.HOME)}>
                            <STYLED.ButtonText style={{ color: theme.colors.blue }}>Back</STYLED.ButtonText>
                        </STYLED.Button>
                        <STYLED.Button style={{ backgroundColor: theme.colors.green_light_secondary, opacity: setDisabled ? 0.5 : 1 }} onPress={onCreateUser} disabled={setDisabled}>
                            <STYLED.ButtonText style={{ color: theme.colors.white }}>Submit</STYLED.ButtonText>
                        </STYLED.Button>
                    </STYLED.ButtonView>
                </STYLED.FormSection>
                : <LoadingComponent />}
        </STYLED.FullPage>
    )
}

export default SignUpScreen
