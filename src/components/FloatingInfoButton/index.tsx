import React, { ReactElement } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { AnimatedFloating, FloatingButtonContainer, InfoIcon } from "./styles";

export const FloatingInfoButton = ():ReactElement => {

    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);

    const handleGestureEvent = useAnimatedGestureHandler({
        onStart(_, context: any){
            context.positionX = positionX.value;
            context.positionY = positionY.value;
        },

        onActive(event, context){
            positionX.value = context.positionX + event.translationX;
            positionY.value = context.positionY + event.translationY;
        },

        onEnd(){
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        },
    });

    const floatingAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: positionX.value},
            { translateY: positionY.value}
        ]
    }))

    return (
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
            <AnimatedFloating 
                style={floatingAnimatedStyle}
            >
                <FloatingButtonContainer>
                    <InfoIcon 
                        name='info'
                    />
                </FloatingButtonContainer>
            </AnimatedFloating>
        </PanGestureHandler>
    )
}