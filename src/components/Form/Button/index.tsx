import React, { ReactElement } from "react";
import { TouchableOpacityProps } from "react-native";
import { ButtonContainer, Title } from "./style";

interface Props extends TouchableOpacityProps {
    title: string;
};

export const Button = ({title, ...rest}: Props): ReactElement => {

    return (
        <ButtonContainer {...rest}>
            <Title>{title}</Title>
        </ButtonContainer>
    )
}