import React, { useEffect, useRef } from 'react'
import { View, Animated, StyleSheet, Easing } from 'react-native'
import theme from '../../themes'

const styledBox = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '50%',
        borderColor: theme.colors.gray.light,
        borderWidth: 10,
        borderStyle: 'solid',
        borderRadius: 1000,
        padding: 15,
        alignSelf: 'center',
        borderTopColor: theme.colors.green_dark_trinary,
        marginTop: 15,
    }
})

const LoadingComponent = () => {
    const rotationAngle = new Animated.Value(0)
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(0),
                Animated.timing(
                    rotationAngle, {
                    toValue: 1,
                    easing: Easing.linear,
                    delay: 0,
                    useNativeDriver: true,
                    duration: 2000
                })
            ])
            , {
                iterations: Infinity,
            }).start()
    }, [rotationAngle])
    const rotationInterplate = rotationAngle.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    return (
        <Animated.View style={[styledBox.container, {
            transform: [{
                rotate: rotationInterplate
            }]
        }]} />
    )
}

export default LoadingComponent
