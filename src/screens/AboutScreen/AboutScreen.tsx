import React from 'react'
import { View, Image } from 'react-native'
import NavigationBar from '../../components/NavigationBar'
import * as STYLED from './styled'
import theme from '../../themes'

const AboutScreen = () => {
    return (
        <STYLED.FullPage>
            <NavigationBar />
            <View style={{ marginTop: 70, height: 'fit-content' }}>
                <STYLED.FullPageRow style={{ flexDirection: theme.fullWidth > 850 ? 'row' : 'column', flexWrap: theme.fullWidth > 850 ? 'warp' : 'nowarp' }}>
                    <STYLED.SideView style={{ maxWidth: theme.fullWidth > 850 ? '50%' : '100%' }}>
                        <STYLED.FullTitle style={{ fontSize: theme.fullWidth > 850 ? 40 : 30 }}>Landscape Pictures</STYLED.FullTitle>
                        <STYLED.AboutText style={{ fontSize: theme.fullWidth > 850 ? 20 : 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus id urna in lobortis. Nunc maximus mi at lorem sollicitudin.</STYLED.AboutText>
                        <Image style={{ width: '100%', minHeight: 600 }} source={{ uri: require('../../storage/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg') }} />
                    </STYLED.SideView>
                    <STYLED.SideView style={{ maxWidth: theme.fullWidth > 850 ? '50%' : '100%' }}>
                        <View style={{ flex: 1, flexDirection: theme.fullWidth > 850 ? 'column' : 'column-reverse' }}>
                            <Image style={{ width: '100%', minHeight: 400 }} source={{ uri: require('../../storage/images/gustav-gullstrand-d6kSvT2xZQo-unsplash.jpg') }} />
                            <View >
                                <STYLED.SubTitle style={{ fontSize: theme.fullWidth > 850 ? 35 : 25 }}>Browse through nature</STYLED.SubTitle>
                                <STYLED.AboutText style={{ fontSize: theme.fullWidth > 850 ? 20 : 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus id urna in lobortis. Nunc maximus mi at lorem sollicitudin.</STYLED.AboutText>
                            </View>
                        </View>
                    </STYLED.SideView>
                </STYLED.FullPageRow>
            </View>
        </STYLED.FullPage>
    )
}

export default AboutScreen
