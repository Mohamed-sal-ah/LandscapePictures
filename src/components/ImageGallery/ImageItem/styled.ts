import styled from 'styled-components/native'
import theme from '../../../themes'

export const ItemView = styled.TouchableOpacity`
width:100%;
height:fit-content;
flex:1;
justify-content:center;
align-items:center;
overflow:hidden;
position:relative;

`

export const GradientImageView = styled.View`
transition-duration:0.25s;
position:absolute;
opacity:0;
width:100%;
height:100%;
background-color:${theme.colors.gradient.regular};
`

export const SmallImageInfoView = styled.View`
position:absolute;
width:100%;
flex:1;
flex-direction:row;
justify-content:space-between;
align-items:center;
`

export const UserProfileView = styled.View`
position:absolute;
padding:5px 10px;
max-width:fit-content;
flex:1;
flex-direction:row;
justify-content:flex-start;
align-items:center;
`

export const UsernameText = styled.Text`
font-family:${theme.fonts.MontserratRegular};
margin-left: 10px;
`

export const ProfilePictureView = styled.TouchableOpacity`
width: fit-content;
`

export const MobileViewUserInfo = styled.View`
width:100%;
padding:15px 10px;
flex:1;
flex-direction:row;
align-items:center;
min-height:fit-content;
`

export const MobileViewUserInfoText = styled.Text`
font-size:18px;
font-family:${theme.fonts.MontserratRegular};
color:${theme.colors.gray.dark};
`