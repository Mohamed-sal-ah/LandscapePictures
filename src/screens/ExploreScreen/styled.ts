import styled from "styled-components/native"
import theme from "../../themes"

export const FullPage = styled.View`
flex:1;
align-items:center;
background-color:${theme.colors.white};
`

export const FullExploreView = styled.View`
margin-top:70px;
flex:1;
align-items:center;
width:100%;
`

export const ExploreTitle = styled.Text`
font-family:${theme.fonts.MontserratRegular};
font-size:40px;
color:${theme.colors.black};
`

export const ExploreText = styled.Text`
font-family:${theme.fonts.RobotoThin};
font-size:17px;
color:${theme.colors.gray.dark};
max-width:60%;
text-align:center;
font-weight: bold;
`

export const ExploreCategoryGallery = styled.View`
padding:10px 15px;
width:100%;
height:100%;
background-color:blue;
`
