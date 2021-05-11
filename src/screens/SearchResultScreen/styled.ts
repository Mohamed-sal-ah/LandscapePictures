import styled from 'styled-components/native'
import theme from '../../themes'

export const FullPage = styled.View`
flex:1;
align-items:center;
background-color:${theme.colors.white};
`

export const FullSearchResultView = styled.View`
margin-top:70px;
flex:1;
align-items:center;
width:100%;
`

export const NoResultView = styled.View`
height: 100%;
flex: 1;
justify-content: center;
align-items: center;
`

export const SearchResultText = styled.Text`
font-family:${theme.fonts.RobotoRegular};
color:${theme.colors.gray.dark};
`