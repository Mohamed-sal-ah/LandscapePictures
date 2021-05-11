import React, { FC } from 'react'
import { Image } from 'react-native'
import * as STYLED from './styled'
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../../navigation/routes'

type Props = {
    categoryItem: {
        type: string,
        file: string
    }
}
const ExploreCategoryItem: FC<Props> = ({ categoryItem }) => {
    const navigation = useNavigation()
    const onSelectCategory = (category: string) => {
        navigation.navigate(screenName.CATEGORY, { category })
    }
    return (
        <STYLED.ExploreItemCategory onPress={() => onSelectCategory(categoryItem.type)}>
            <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri: require(`../../../storage/categoryImages/${categoryItem.file}`) }}
            />
            <STYLED.GradiantItem>
                <STYLED.ExploreCategoryText>{categoryItem.type}</STYLED.ExploreCategoryText>
            </STYLED.GradiantItem>
        </STYLED.ExploreItemCategory>
    )
}

export default ExploreCategoryItem
