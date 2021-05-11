import styled from 'styled-components/native'
import theme from '../../themes'

export const FullView = styled.View`
flex: 1;
justify-content: center;
align-items: center;
padding:20px;
height:100%;
`

export const HeaderAndExitView = styled.View`
flex:1;
align-items:center;
justify-content:space-between;
padding:20px 0;
flex-direction:row;
width:100%;
margin-bottom:10px;
max-height:100px;
`

export const HeaderAndTextView = styled.View`
flex:1;
align-items:center;
justify-content:flex-start;
flex-direction:row;
`

export const ProfilePictureView = styled.View`
width: fit-content;
`

export const UsernameText = styled.Text`
font-family:${theme.fonts.MontserratSemiBold};
font-size:20px;
margin-left:10px;
`

export const ExitModalButton = styled.TouchableOpacity`
min-height:50px;
min-width:50px;
flex:1;
align-items:center;
justify-content:center;
`

export const InfoAndDownLoadView = styled.View`
flex:0 1 auto;
align-items:center;
justify-content:space-between;
padding:5px 0;
flex-direction:row;
width:100%;
margin:10px 0;

`

export const DownLoadText = styled.Text`
color:${theme.colors.white};
font-family:${theme.fonts.RobotoRegular};
font-size:18px;
margin: 0 10px;
`

export const ImageInfoView = styled.View`
flex:1;
align-items:flex-start;
flex-direction:column;
justify-content:flex-start;
max-width: 300px;
height:fit-content;
overflow:hidden;
`

export const LoactionView = styled.View`
flex:1;
align-items:center;
justify-content:flex-end;
flex-direction:row;
max-width: fit-content;
min-height:30px;
`

export const ImageInfoText = styled.Text`
font-family:${theme.fonts.RobotoRegular};
font-size:18px;
`