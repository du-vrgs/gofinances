import React, { ReactElement } from "react";
import { RectButtonProps, GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon, Title, TransactionTypeButtonContainer, Container } from "./style";

const ICON = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface Props extends RectButtonProps {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
}

export const TransactionTypeButton = ({title, type, isActive, ...rest}: Props):ReactElement => {

    return (
        <GestureHandlerRootView style={{
            width: '48%',
        }}>
            <Container isActive={isActive}>
                <TransactionTypeButtonContainer 
                    {...rest}
                    isActive={isActive}
                    type={type}
                >
                    <Icon name={ICON[type]} type={type} />
                    <Title>
                        {title}
                    </Title>
                </TransactionTypeButtonContainer>
            </Container>
        </GestureHandlerRootView>
    )
}