import styled from 'styled-components/native'
import theme from '../../themes'

export const FullPage = styled.View`
flex:1;
align-items:center;
background-color:${theme.colors.white};
`

export const FullAboutView = styled.View`
margin-top: 70px;
height: fit-content;
`

export const AboutImage = styled.Image`
width:100%;
`

export const FullPageRow = styled.View`
flex:1;
align-items:center;
width:100vw;
justify-content:space-between;
flex-wrap:wrap;
`

export const SideView = styled.View`
padding:20px 10px;
align-self:flex-start;
`

export const FullTitle = styled.Text`
font-family:${theme.fonts.BaumansRegular};
font-size:40px;
color:${theme.colors.green_primary};
text-align:center;
`
export const SubTitle = styled.Text`
font-family:${theme.fonts.MontserratRegular};
font-size:35px;
color:${theme.colors.green_primary};
text-align:center;
`

export const AboutText = styled.Text`
font-family:${theme.fonts.MontserratRegular};
font-size:20px;
margin-top:10px;
margin-bottom:20px;
color:${theme.colors.gray.dark};
text-align:center;
`