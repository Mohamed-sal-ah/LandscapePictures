import styled from 'styled-components/native'
import theme from '../../themes'

export const divStyles = {
    cursor: 'pointer',
    borderStyle: 'dashed',
    borderColor: theme.colors.gray.dark,
    borderWidth: '3px',
    borderRadius: '20px',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

export const selectStyles = {
    container: (base: any) => ({
        ...base,
        width: "100%",
        fontFamily: theme.fonts.RobotoRegular,
    }),
    menuList: (base: any) => ({
        ...base,
        color: theme.colors.gray.dark,
        paddingBottom: "10px"
    }),
    menu: (base: any) => ({
        ...base,
        marginTop: "1px",
    }),
    control: (base: any) => ({
        ...base,
        borderColor: theme.colors.gray.light,
        borderWidth: '2px',
        cursor: 'pointer',
        boxShadow: "none",
        ':hover': {
            borderColor: theme.colors.gray.light,
        }
    }),
    option: (styles: any, state: any) => ({
        ...styles,
        backgroundColor: theme.colors.white,
        color: theme.colors.gray.dark,
        ':hover': {
            backgroundColor: theme.colors.gray.white_gray,
            color: theme.colors.gray.dark,
        }

    }),
    placeholder: (base: any) => ({
        ...base,
        color: theme.colors.gray.light,
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        color: theme.colors.gray.dark,
        ':hover': {
            color: theme.colors.gray.dark,
        }
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: theme.colors.gray.white_gray,
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: theme.colors.gray.dark,
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        color: theme.colors.gray.dark,
        ':hover': {
            color: theme.colors.red,
        },
    }),
    clearIndicator: (base: any) => ({
        ...base,
        color: theme.colors.gray.dark,
        ':hover': {
            color: theme.colors.red,
        }
    })
}

export const FullPage = styled.View`
flex:1;
align-items:center;
background-color:${theme.colors.white};
overflow:auto;
`

export const DropZoneView = styled.View`
width:90%;
height:90%;
margin-top:10px;
`

export const SetImageUploadView = styled.View`
flex:1;
align-items:center;
margin-top: 10px;
`

export const InputView = styled.View`
flex:1;
align-items:center;
flex-direction:column;
justify-content:flex-start;
width:100%;
flex:1;
`

export const DetailsImageInputView = styled.View`
background-color:${theme.colors.gray.white_gray};
min-height:40px;
padding:5px;
border-radius:5px;
margin-top:10px;
flex:1;
max-height:40px;
flex-direction:row;
align-items:center;
justify-content:space-between;
width:400px;
`

export const DetailsImageInput = styled.TextInput`
font-family:${theme.fonts.RobotoRegular};
min-height:40px;
width:90%;
margin-left:10px;
color:${theme.colors.gray.dark};
font-size:15px;
outline-width:0 !important;
`

export const ButtonView = styled.View`
max-height: 36px;
height:fit-content;
flex:1;
flex-direction:row;
align-items:center;
width:400px;
margin:10px 0;
`

export const SubmitButton = styled.TouchableOpacity`
background-color:${theme.colors.green_light_secondary};
padding:7px;
width:70px;
height:fit-content;
border-radius:5px;
`

export const SubmitButtonText = styled.Text`
font-size:17px;
color: ${theme.colors.white};
text-align:center;
`

export const CancelButton = styled.TouchableOpacity`
border:2px solid ${theme.colors.gray.dark};
box-sizing:border-box;
padding:5px;
height:fit-content;
width:70px;
border-radius:5px;
margin-left:15px;
`

export const CancelButtonText = styled.Text`
font-family:${theme.fonts.RobotoRegular};
font-size:17px;
color:${theme.colors.gray.dark};
text-align:center;
`

export const SelectView = styled.View`
width:400px;
padding-top:10px;
z-index:1;
`
export const BackButton = styled.TouchableOpacity`
box-sizing:border-box;
padding:5px;
background-color:${theme.colors.red};
height:fit-content;
width:70px;
border-radius:5px;
margin-left:15px;
`

export const BackButtonText = styled.Text`
font-family:${theme.fonts.RobotoRegular};
font-size:17px;
color:${theme.colors.white};
text-align:center;
`


export const DropZoneText = styled.Text`
font-family:${theme.fonts.RobotoRegular};
font-size:20px;
color: ${theme.colors.gray.dark};
`

export const ProgressBarBackground = styled.View`
border-radius:20px;
overflow:hidden;
flex:1;
justify-content:center;
align-items:flex-start;
width:500px;
height:30px;
background-color:${theme.colors.gray.dark};
`

export const ProgressBarProgress = styled.View`
background-color:${theme.colors.green_primary};
height:30px;
flex:1;
justify-content:center;
`

export const ProgressBarText = styled.Text`
font-family:${theme.fonts.RobotoRegular};
font-size:17px;
color:${theme.colors.white};
width: 500px;
text-align: center;
`

export const SucessUploadView = styled.View`
flex-direction:row;
align-items:center;
justify-content:space-between;
margin-bottom:20px;
`

export const SuccesUploadText = styled.Text`
 font-family:${theme.fonts.RobotoRegular};
 font-size:20px;
 `