import styled from 'styled-components/native'
import theme from '../../themes'

export const FullPage = styled.View`
height:100%;
flex:1;
align-items:center;
justify-content:center;
background-color:${theme.colors.white};
`

export const FormSection = styled.View`
text-align:center;
align-self:center;
width:90%;
`

export const FullTitle = styled.Text`
font-family:${theme.fonts.BaumansRegular};
font-size:40px;
color:${theme.colors.green_primary};
`
export const SubTitle = styled.Text`
font-family:${theme.fonts.MontserratRegular};
font-size:20px;
margin:10px 0;
color:${theme.colors.gray.dark};
`

export const InputForm = styled.View`
max-width:330px;
align-self:center;
width:100%;
`

export const InputLabel = styled.Text`
font-family:${theme.fonts.MontserratSemiBold};
font-size:20px;
color:${theme.colors.gray.dark};
align-self:flex-start;
margin-bottom:5px;
`

export const SignInInputView = styled.View`
padding:5px;
border-radius:5px;
flex:1;
min-height:40px;
max-height:42px;
flex-direction:row;
align-items:center;
justify-content:center;
background-color:${theme.colors.gray.white_gray};
margin-bottom:10px;
`

export const SignInInput = styled.TextInput`
font-family:${theme.fonts.RobotoRegular};
min-height:40px;
width:90%;
margin-left:10px;
color:${theme.colors.gray.dark};
font-size:15px;
outline-width:0 !important;
`

export const SubmitButton = styled.TouchableOpacity`
background-color:${theme.colors.green_light_secondary};
width:100%;
padding:5px 20px;
border-radius:5px;
margin:15px 0; 
`

export const SubmitText = styled.Text`
font-family:${theme.fonts.RobotoRegular};
font-size:20px;
color:${theme.colors.white};
text-align:center;
`

export const OtherLinks = styled.Text`
font-family:${theme.fonts.RobotoRegular};
font-size:16px;
color:${theme.colors.blue};
`