import styled from 'styled-components/native'
import theme from '../../themes'

export const FullPage = styled.View`
flex:1;
align-items:center;
background-color:${theme.colors.white};
`

export const CategoryTitle = styled.Text`
font-family:${theme.fonts.MontserratRegular};
font-size:40px;
color:${theme.colors.black};
`

export const CategoryText = styled.Text`
font-family:${theme.fonts.RobotoThin};
font-size:17px;
color:${theme.colors.gray.dark};
max-width:60%;
text-align:center;
font-weight: bold;
padding-bottom:10px;
`