import styled from "styled-components/native";
import theme from "../../themes";

export const FullPage = styled.View`
background-color:${theme.colors.white};
flex:1;
align-items:center;
justify-content:center;
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

export const FormSection = styled.View`
text-align:center;
align-self:center;
width:auto;
`

export const InputForm = styled.View`
max-width:330px;
width:100%;
align-self:center;
`

export const InputLabel = styled.Text`
font-family:${theme.fonts.MontserratSemiBold};
font-size:20px;
color:${theme.colors.gray.dark};
align-self:flex-start;
margin-bottom:5px;
`

export const UpdateInfoInputView = styled.View`
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

export const UpdateInfoInput = styled.TextInput`
font-family:${theme.fonts.RobotoRegular};
min-height:40px;
width:90%;
margin-left:10px;
color:${theme.colors.gray.dark};
font-size:15px;
outline-width:0 !important;
`

export const ProfilePictureInputView = styled.View`
padding:10px;
flex:1;
justify-content:space-evenly;
align-items:center;
`


export const ButtonView = styled.View`
flex:1;
max-width:330px;
flex-direction:row;
justify-content:space-between;
align-items:center;
max-height: 50px;
width:100%;
min-height:auto;
`

export const Button = styled.TouchableOpacity`
padding:5px 20px;
border-radius:5px;
margin:15px 0; 
`

export const ButtonText = styled.Text`
font-family:${theme.fonts.RobotoRegular};
font-size:20px;
text-align:center;
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