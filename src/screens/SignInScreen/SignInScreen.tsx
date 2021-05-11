import React, { useState, useEffect, useRef } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { screenName, LoginScreenName } from '../../navigation/routes'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../firebase'
import * as STYLED from './styled'
import theme from '../../themes'


const SignInScreen = () => {
    const [email, setEmail] = useState('')
    const emailRef: any = useRef(null)
    const passwordRef: any = useRef(null)
    const [error, setError] = useState(null)
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const { signIn }: any = useAuth()
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            emailRef.current.clear()
            passwordRef.current.clear()
            setEmail('')
            setPassword('')
        })
        return unsubscribe
    }, [navigation])

    const onSignIn = async () => {
        let clearError = null
        await signIn(email, password).catch((error: any) => {
            setError(error)
            clearError = error
            console.error(error.message);
        })
        !clearError && navigation.navigate(screenName.HOME)
    }
    const setDisabled = password === '' || email === ''
    return (
        <STYLED.FullPage>
            <STYLED.FormSection>
                <STYLED.FullTitle>Landscape Pictures</STYLED.FullTitle>
                <STYLED.SubTitle>Sign in your account </STYLED.SubTitle>
                <STYLED.InputForm accessibilityRole='form'>
                    <STYLED.InputLabel>Email:</STYLED.InputLabel>
                    <STYLED.SignInInputView>
                        <STYLED.SignInInput ref={emailRef} placeholderTextColor={theme.colors.gray.light} placeholder="Set Email" onChangeText={setEmail} />
                    </STYLED.SignInInputView>
                    <STYLED.InputLabel>Password:</STYLED.InputLabel>
                    <STYLED.SignInInputView>
                        <STYLED.SignInInput ref={passwordRef} placeholderTextColor={theme.colors.gray.light} secureTextEntry={true} placeholder="Set Password" onChangeText={setPassword} />
                    </STYLED.SignInInputView>
                    <STYLED.SubmitButton onPress={onSignIn} style={{ opacity: setDisabled ? 0.5 : 1 }} disabled={setDisabled}>
                        <STYLED.SubmitText>Login</STYLED.SubmitText>
                    </STYLED.SubmitButton>
                </STYLED.InputForm>
                {error && <Text>{error?.message}</Text>}
                <TouchableOpacity onPress={() => navigation.navigate(LoginScreenName.SIGN_UP)}>
                    <STYLED.OtherLinks>Don't have a account Register here</STYLED.OtherLinks>
                </TouchableOpacity>
            </STYLED.FormSection>
        </STYLED.FullPage>
    )
}

export default SignInScreen
