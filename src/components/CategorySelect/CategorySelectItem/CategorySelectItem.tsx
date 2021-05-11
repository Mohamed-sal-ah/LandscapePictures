import React, { FC } from 'react'
import * as STYLED from './styled'
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../../navigation/routes'
import { View } from 'react-native'

type Props = {
    categoryItem: {
        type: string,
        file: string
    }
}

const CategorySelectItem: FC<Props> = ({ categoryItem }) => {
    const navigation = useNavigation()
    const onSelectCategory = (category: string) => {
        navigation.navigate(screenName.CATEGORY, { category })
    }
    return (
        <View>
            <STYLED.OneCategorySelection onPress={() => onSelectCategory(categoryItem.type)}>
                <STYLED.CategoryImage source={require(`../../../storage/categoryImages/${categoryItem.file}`)} />
                <STYLED.CategoryText>
                    {categoryItem.type}
                </STYLED.CategoryText>
            </STYLED.OneCategorySelection>
        </View>
    )
}

export default CategorySelectItem
