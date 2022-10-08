import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { BorderlessButton } from 'react-native-gesture-handler';
import { PropsWithChildren } from 'react';
// import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from "styled-components/native";


interface Props extends PropsWithChildren<BorderlessButtonProps> {
    isActive?: boolean;
    type?: 'up' | 'down'
}

export const Container = styled.View<Props>`
    width: 100%;
    border: 1.5px solid ${({theme}) => theme.colors.text};
    border-radius: 4px;

    ${({isActive}) => isActive && css`
        border: 0px;
    `}
`

export const TransactionTypeButtonContainer = styled(BorderlessButton)<Props>`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 16px;

    ${({theme, isActive, type}) => isActive && css`
        background-color: ${type === 'up' ? theme.colors.success_light : theme.colors.attention_light};
    `}
`

export const Icon = styled(Feather)<Props>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    ${({theme, type}) => type === 'up' && css`
        color: ${theme.colors.success};
    `}

    ${({theme, type}) => type === 'down' && css`
        color: ${theme.colors.attention};
    `}
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size; ${RFValue(14)}px;
`