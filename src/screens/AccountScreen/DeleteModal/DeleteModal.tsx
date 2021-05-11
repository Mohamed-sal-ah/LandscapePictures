import React, { FC } from 'react'
import theme from '../../../themes'
import * as STYLED from './styled'

type Props = {
    onCancel: () => void,
    onDelete: () => void
}

const DeleteModal: FC<Props> = ({ onCancel, onDelete }: any) => {
    return (
        <STYLED.FullModalView>
            <STYLED.TitleModal>Remove this image?</STYLED.TitleModal>
            <STYLED.SubTitleModal>Deleted image can’t be restored</STYLED.SubTitleModal>
            <STYLED.ButtonView>
                <STYLED.Button style={{ backgroundColor: theme.colors.gray.dark }} onPress={() => onCancel()}>
                    <STYLED.ButtonText>Cancel</STYLED.ButtonText>
                </STYLED.Button>
                <STYLED.Button style={{ backgroundColor: theme.colors.red }} onPress={() => onDelete()}>
                    <STYLED.ButtonText>Delete</STYLED.ButtonText>
                </STYLED.Button>
            </STYLED.ButtonView>
        </STYLED.FullModalView>
    )
}

export default DeleteModal
