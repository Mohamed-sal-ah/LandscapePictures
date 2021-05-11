import React from 'react'
import NavigationBar from '../../components/NavigationBar'
import * as STYLED from './styled'
import categoryArray from '../../data/categorys.json'
import ExploreCategoryItem from './ExploreCategoryItem';
import theme from '../../themes'

const ExploreScreen = () => {
    const returnGridAuto = (width: number) => {
        if (width > 1000) {
            return 'auto auto auto'
        } else if (width > 660) {
            return 'auto auto'
        } else {
            'auto'
        }
    }
    return (
        <STYLED.FullPage>
            <NavigationBar />
            <STYLED.FullExploreView>
                <STYLED.ExploreTitle>Explore</STYLED.ExploreTitle>
                <STYLED.ExploreText>Browse throug thousands of pictures of nature</STYLED.ExploreText>
                <div style={{
                    padding: '10px 0',
                    width: '97%',
                    height: 'fit-content',
                    display: 'grid',
                    gap: '10px',
                    gridTemplateColumns: returnGridAuto(theme.fullWidth)
                }}>
                    {categoryArray.map((categoryItem: any, index: number) => (
                        <ExploreCategoryItem categoryItem={categoryItem} key={index} />
                    ))}
                </div>
            </STYLED.FullExploreView>
        </STYLED.FullPage>
    )
}

export default ExploreScreen
