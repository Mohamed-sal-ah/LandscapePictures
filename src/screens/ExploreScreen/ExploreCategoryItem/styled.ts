import styled from "styled-components/native"
import theme from "../../../themes"

export const ExploreItemCategory = styled.TouchableOpacity`
position:relative;
width:100%;
height:100%;
min-height:300px;
border-radius:10px;
overflow:hidden;
`

export const ExploreCategoryImage = styled.Image`
width:100%;
height:100%;
`

export const GradiantItem = styled.View`
position:absolute;
width:100%;
height:100%;
background-color:${theme.colors.gradient.regular};
flex:1;
align-items:center;
justify-content:center;
`

export const ExploreCategoryText = styled.Text`
font-family:${theme.fonts.MontserratRegular};
font-size: 20px;
color: ${theme.colors.white};
`