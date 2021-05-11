import styled from 'styled-components/native'
import theme from '../../themes'

export const FullPage = styled.View`
flex:1;
align-items:center;
background-color:${theme.colors.white};
`

export const FullPageView = styled.View`
flex:1;
align-items:center;
position:relative;
background-color:${theme.colors.white};
`

export const FullImageView = styled.View`
flex:1;
min-height: 100vh;
  width: 100%;
`

export const HomePageImage = styled.Image`
width:100vw;
position:absolute;
height:100vh;
`

export const CenterPositionView = styled.View`
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
align-items:center;
`

export const BackgroundView = styled.View`
background-color:${theme.colors.gradient.regular};
`

export const BackgroundTitle = styled.Text`
font-family:${theme.fonts.BaumansRegular};
color:${theme.colors.white};
`
export const BackgroundText = styled.Text`
font-family:${theme.fonts.MontserratRegular};
color:${theme.colors.white};
margin-bottom: 0px;
text-align:center;
`

export const BackgroundImageInfo = styled.View`
background-color:${theme.colors.gradient.regular};
padding:10px 15px;
flex:1;
margin-top: auto;
max-height:50px;
flex-direction:row;
align-items:center;
justify-content:space-between;
`

export const ImageInfoText = styled.Text`
font-family:${theme.fonts.MontserratRegular};
color:${theme.colors.white};
`

