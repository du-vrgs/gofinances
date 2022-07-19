import React, { ReactElement } from "react";
import { TouchableOpacityProps } from "react-native";
import { Icon, Title, TransactionTypeButtonContainer as Container } from "./style";

const ICON = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface Props extends TouchableOpacityProps {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
}

export const TransactionTypeButton = ({title, type, isActive, ...rest}: Props):ReactElement => {

    return (
        <Container {...rest} isActive={isActive} type={type}>
            <Icon name={ICON[type]} type={type} />
            <Title>
                {title}
            </Title>
        </Container>
    )
}