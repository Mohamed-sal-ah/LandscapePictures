import styled from 'styled-components/native'
import theme from '../../themes'

export const FullSearchBar = styled.View`
max-width:400px;
align-self:center;
background-color:${theme.colors.gray.white_gray};
padding:5px;
border-radius:5px;
flex:1;
min-height:40px;
max-height:40px;
flex-direction:row;
align-items:center;
justify-content:space-between;
`

export const SearchBarInput = styled.TextInput`
font-family:${theme.fonts.RobotoRegular};
width:90%;
margin-left:10px;
color:${theme.colors.gray.dark};
outline-width:0 !important;
outline-style:none;
`

export const SearchIconView = styled.TouchableOpacity`
margin-right:5px;
min-height:40px;
min-width:30px;
flex:1;
align-items:center;
justify-content:center;

`