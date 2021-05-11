import styled from 'styled-components/native'
import theme from '../../themes'

export const FullPage = styled.View`
flex:1;
align-items:center;
background-color:${theme.colors.white};
`

export const UserInfoView = styled.View`
flex:0 1 auto;
align-items:center;
justify-content:center;
flex-direction:row;
min-height:fit-content;
max-height:250px;
width:65%;
padding:20px 10px;
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

export const DefaultProfilePictureView = styled.View`
border-radius: 100px;
min-height: 100px;
min-width: 100px;
width: fit-content;
align-items: center;
justify-content: center;
background-color: ${theme.colors.red};
`