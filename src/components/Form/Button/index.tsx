import React, { ReactElement } from "react";
import { RectButtonProps, GestureHandlerRootView } from "react-native-gesture-handler";
import { ButtonContainer, Title } from "./style";

interface Props extends RectButtonProps {
    title: string;
    onPress: () => void;
};

export const Button = ({title, onPress, ...rest}: Props): ReactElement => {

    return (
        <GestureHandlerRootView style={{ width: '100%' }}>
            <ButtonContainer onPress={onPress} {...rest}>
                <Title>{title}</Title>
            </ButtonContainer>
        </GestureHandlerRootView>
    )
}