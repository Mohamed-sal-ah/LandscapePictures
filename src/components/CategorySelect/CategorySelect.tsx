import React from 'react'
import CategorySelectItem from './CategorySelectItem'
import * as STYLED from './styled'
import categoryArray from '../../data/categorys.json'

const CategorySelect = () => (
    <STYLED.FullCategorySelect>
        {categoryArray.map((categoryItem: any, index: number) => (
            <CategorySelectItem key={index} categoryItem={categoryItem} />
        ))}
    </STYLED.FullCategorySelect>
)

export default CategorySelect
