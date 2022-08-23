import React, { ReactElement, useEffect } from "react";
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SplashContainer } from "./styles";

import Logo from "../../assets/splashLogo.svg"
import AppName from "../../assets/splashLogo2.svg"
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../providers/AuthContext";


export const Splash = (): ReactElement => {

    const { isUserSignOn } = useAuth();
    const navigation = useNavigation<NavigationProp<any>>();
    const animation = useSharedValue(0);
    const screenAnimation = useSharedValue(0);

    const screenAninatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: interpolate(screenAnimation.value, [0, 50], [0,-250])
            }
        ]
    }))
    const logoAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: interpolate(animation.value, 
                [0, 25, 50],
                [0, -15, -30]
                )
            }
        ]
    }))
    const appNameAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(animation.value, [0, 25, 50], [0, .3, 1]),
        transform: [
            {
                translateY: interpolate(animation.value, 
                [0, 25, 50],
                [0, 15, 30]
                )
            }
        ]
    }))

    const startApp = () => {
        navigation.navigate(isUserSignOn ? 'Listagem' : 'SignIn')
    }

    useEffect(() => {
        animation.value = withTiming(50, { duration: 1000 });
        screenAnimation.value = withTiming(50, { duration: 1500 }, (finished) => {
            'worklet';
            finished && runOnJS(startApp)();
        });
    }, [])

    return (
        <SplashContainer>
            <Animated.View style={[screenAninatedStyle, { 'alignItems': 'center', 'justifyContent': 'center'}]}>
                <Animated.View style={[logoAnimatedStyle ,{ position: 'absolute' }]}>
                    <Logo width={135} height={67.5}/>
                </Animated.View>

                <Animated.View style={[appNameAnimatedStyle,{ position: 'absolute' }]}>
                    <AppName width={120}/>
                </Animated.View>
            </Animated.View>
        </SplashContainer>
    )
}