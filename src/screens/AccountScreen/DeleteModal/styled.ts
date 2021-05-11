import styled from 'styled-components/native'
import theme from '../../../themes'

export const FullModalView = styled.View`
flex:1;
align-items:center;
justify-content:center;
min-height:100px;
min-width: 335px;
`

export const TitleModal = styled.Text`
font-family:${theme.fonts.MontserratSemiBold};
color:${theme.colors.black};
font-size:25px;
`

export const SubTitleModal = styled.Text`
font-family:${theme.fonts.MontserratRegular};
color:${theme.colors.gray.dark};
font-size:17px;
`

export const ButtonView = styled.View`
flex:1;
flex-direction:row;
justify-content:space-between;
align-items:center;
width:90%;
margin-top: 15px;
`

export const Button = styled.TouchableOpacity`
padding:10px 20px;
border-radius:5px;
`

export const ButtonText = styled.Text`
font-family:${theme.fonts.RobotoRegular};
color:${theme.colors.white};
font-size:17px;
`