import styled from 'styled-components/native'
import theme from '../../themes'

export const FullPage = styled.View`
flex:1;
align-items:center;
background-color:${theme.colors.white};
`

export const FullAccountView = styled.View`
margin-top:70px;
flex:1;
align-items:center;
width:100%;
justify-content:flex-start;
`

export const ProfilePicture = styled.Image`
width:100px;
height:100px;
border-radius:100%;
`

export const UserInfoView = styled.View`
flex:0 1 auto;
align-items:center;
justify-content:center;
flex-direction:row;
min-height:fit-content;
width:65%;
padding:20px 10px;
`
export const DefaultProfilePictureView = styled.View`
border-radius: 100px;
min-height: 100px;
min-width: 100px;
width: fit-content;
align-items: center;
justify-content: center;
background-color: ${theme.colors.red};
`

export const UserInfoTextView = styled.View`
flex:0;
min-width:fit-content;
min-height:auto;
`

export const UserTitle = styled.Text`
font-family:${theme.fonts.MontserratSemiBold};
font-size:35px;
color:${theme.colors.black};
max-width:fit-content;
margin-bottom:10px;
`

export const UserText = styled.Text`
font-family:${theme.fonts.RobotoThin};
font-size:15px;
color:${theme.colors.gray.dark};
font-weight: bold;
padding-bottom:10px;
max-width:400px;
`

export const ButtonLink = styled.TouchableOpacity`
margin:10px 0;
padding:7px;
height:fit-content;
border-radius:5px;
`

export const ButtonLinkText = styled.Text`
font-size:17px;
text-align:center;
`

