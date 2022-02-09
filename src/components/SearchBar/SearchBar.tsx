import React, { useState } from 'react'
import * as STYLED from './styled'
import { SearchSvg } from '../../assets/'
import theme from '../../themes'
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../navigation/routes'
import { ScaledSize, useWindowDimensions } from 'react-native'

interface Props {
    searchResult: string,
    widthStyle: any
}
const SearchBar = ({ searchResult, widthStyle = 'auto' }: Partial<Props>) => {
    const dimensions: ScaledSize = useWindowDimensions();
    const [searchText, setSearchText] = useState('')
    const navigation = useNavigation()
    const onPressSearch = () => {
        navigation.navigate(screenName.SEARCH, {
            search: searchText
        })
    }
    return (
        <STYLED.FullSearchBar style={{ width: widthStyle }}>
            <STYLED.SearchBarInput
                onChangeText={setSearchText}
                placeholderTextColor={theme.colors.gray.light}
                defaultValue={searchResult}
                style={{ fontSize: dimensions.width > 600 ? 15 : 12 }}
                placeholder="Search for images"
            />
            <STYLED.SearchIconView onPress={onPressSearch}>
                <SearchSvg fillColor="#4F4F4F" size={dimensions.width > 600 ? 25 : 20} />
            </STYLED.SearchIconView>
        </STYLED.FullSearchBar>
    )
}

export default SearchBar
