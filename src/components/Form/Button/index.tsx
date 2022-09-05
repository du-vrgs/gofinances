import React, { ReactElement } from "react";
import { RectButtonProps, GestureHandlerRootView } from "react-native-gesture-handler";
import { ButtonContainer, Title } from "./style";

interface Props extends RectButtonProps {
    title: string;
    bgColor?: string;
    onPress: () => void;
    size?: 'full' | 'fifty'
};

export const Button = ({onPress, title, bgColor, size = 'full', ...rest}: Props): ReactElement => {

    return (
        <GestureHandlerRootView style={{ width: size === 'full' ? '100%' : '48%' }}>
            <ButtonContainer bgColor={bgColor} onPress={onPress} {...rest}>
                <Title>{title}</Title>
            </ButtonContainer>
        </GestureHandlerRootView>
    )
}