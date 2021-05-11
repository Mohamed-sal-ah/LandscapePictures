import styled from 'styled-components/native'
import theme from '../../themes'

export const FullViewNavigation = styled.View`
background-color:${theme.colors.white};
flex:1;
align-items:center;
position:fixed;
top:0%;
height:60px;
width:100vw;
justify-content:space-between;
flex-direction:row;
z-index:2;
shadow-color: ${theme.colors.gradient.light};
shadow-opacity: 1;
shadow-radius: 5px;
`

export const NavigationSection = styled.View`
flex:1;
justify-content:flex-end;
flex-direction:row;
align-items:center;
margin-right:5px;
max-width:35vw;
`

export const TitlePage = styled.Text`
font-family:${theme.fonts.BaumansRegular};
color:${theme.colors.green_primary};
width:100%;
margin:10px;
`

export const NavigationLinks = styled.TouchableOpacity`
margin:0 10px;
flex:1;
align-items:center;
justify-content:center;
height:30px;
width:90px;
`
export const LinksText = styled.Text`
font-family:${theme.fonts.RobotoRegular};
color:${theme.colors.gray.dark};
font-size:17px;
`

export const ModalView = styled.View`
height:100%;
width:100%;
background-color:${theme.colors.white};
position:fixed;
z-index:1;
`