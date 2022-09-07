import React, { ReactElement, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { Easing, Keyframe, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { useTheme } from "styled-components";
import { ButtonContainer, Title, LoadingSpinner } from "./style";

interface Props extends RectButtonProps {
    title: string;
    bgColor?: string;
    onPress: () => void;
    size?: 'full' | 'fifty'
    loading?: boolean;
};

export const Button = ({onPress, loading, title, bgColor, size = 'full', ...rest}: Props): ReactElement => {


    const theme = useTheme();

    // const rotate = useSharedValue(0);
    // const loadAnimation = useAnimatedStyle(() => ({
    //     transform: [
    //         {rotate: `${rotate.value}deg`}
    //     ]
    // }), [])

    // useEffect(() => {
    //     rotate.value = withRepeat(
    //         withTiming(360, { duration: 900, easing: Easing.linear }),
    //         -1,
    //     )
    // }, [rotate])

    return (
        <GestureHandlerRootView style={{ width: size === 'full' ? '100%' : '48%' }}>
            <ButtonContainer bgColor={bgColor} onPress={onPress} {...rest}>
                <Title hasLoad={loading}>{title}</Title>
                {/* {loading && 
                <Animated.View style={loadAnimation}>
                    <LoadingSpinner name='loader'/>
                </Animated.View>} */}
                {loading &&
                    <ActivityIndicator color={theme.colors.shape} />
                }
            </ButtonContainer>
        </GestureHandlerRootView>
    )
}