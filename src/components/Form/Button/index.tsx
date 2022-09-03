import React, { ReactElement } from "react";
import { RectButtonProps, GestureHandlerRootView } from "react-native-gesture-handler";
import { ButtonContainer, Title } from "./style";

interface Props extends RectButtonProps {
    title: string;
    onPress: () => void;
    bgColor?: string;
};

export const Button = ({title, onPress, bgColor, ...rest}: Props): ReactElement => {

    return (
        <GestureHandlerRootView style={{ width: '100%' }}>
            <ButtonContainer onPress={onPress} bgColor={bgColor} {...rest}>
                <Title>{title}</Title>
            </ButtonContainer>
        </GestureHandlerRootView>
    )
}