import styled from "styled-components/native"
import theme from "../../../themes"

export const OneCategorySelection = styled.TouchableOpacity`
width:100px;
margin:0 10px; 
flex:1;
flex-direction:row;
justify-content:space-between;
align-items:center;
shadow-color: ${theme.colors.gray.dark};
shadow-opacity: 1;
shadow-radius: 5px;
min-height:54px;
min-width:210px;
elevation: 5;
border-radius:25px;
`

export const CategoryImage = styled.Image`
border-radius:100%;
width:42px;
height:42px;
margin-left:10px;
`

export const CategoryText = styled.Text`
margin-right:10px;
font-size: 17px;
font-family:${theme.fonts.MontserratRegular};
color:${theme.colors.gray.dark};
width:130px;
text-align:center;
`