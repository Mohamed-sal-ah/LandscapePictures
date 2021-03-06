import React from 'react'
import { ScaledSize, useWindowDimensions, View } from 'react-native'
import NavigationBar from '../../components/NavigationBar'
import * as STYLED from './styled'

const AboutScreen = () => {
    const dimensions: ScaledSize = useWindowDimensions();
    return (
        <STYLED.FullPage>
            <NavigationBar />
            <STYLED.FullAboutView>
                <STYLED.FullPageRow style={{ flexDirection: dimensions.width > 850 ? 'row' : 'column', flexWrap: dimensions.width > 850 ? 'warp' : 'nowarp' }}>
                    <STYLED.SideView style={{ maxWidth: dimensions.width > 850 ? '50%' : '100%' }}>
                        <STYLED.FullTitle style={{ fontSize: dimensions.width > 850 ? 40 : 30 }}>Landscape Pictures</STYLED.FullTitle>
                        <STYLED.AboutText style={{ fontSize: dimensions.width > 850 ? 20 : 15 }}>Hello and welcome to Landscape Pictures this is where you can find and download pictures and also this app uses Firebase. You can Register and submit your photo</STYLED.AboutText>
                        <STYLED.AboutImage style={{ width: '100%', minHeight: 600 }} source={{ uri: require('../../storage/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg') }} />
                    </STYLED.SideView>
                    <STYLED.SideView style={{ maxWidth: dimensions.width > 850 ? '50%' : '100%' }}>
                        <View style={{ flex: 1, flexDirection: dimensions.width > 850 ? 'column' : 'column-reverse' }}>
                            <STYLED.AboutImage style={{ width: '100%', minHeight: 400, marginBottom: dimensions.width > 850 ? 10 : 0 }} source={{ uri: require('../../storage/images/gustav-gullstrand-d6kSvT2xZQo-unsplash.jpg') }} />
                            <View>
                                <STYLED.SubTitle style={{ fontSize: dimensions.width > 850 ? 30 : 25 }}>Browse through nature</STYLED.SubTitle>
                                <STYLED.AboutText style={{ fontSize: dimensions.width > 850 ? 20 : 15 }}>Most of the users and images data comes from localy and images comes from Pexels and Unspalsh. This is due to Firebase storage CORS policy blocking you from downloading directly from the site.</STYLED.AboutText>
                            </View>
                        </View>
                    </STYLED.SideView>
                </STYLED.FullPageRow>
            </STYLED.FullAboutView>
        </STYLED.FullPage>
    )
}

export default AboutScreen
