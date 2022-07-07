import styled, { css } from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from "@expo/vector-icons";

interface Props {
    type: 'up' | 'down' | 'dollar';
}

const BACKGROUND = {
    up: 'shape',
    down: 'shape',
    dollar: 'secondary',
}
const ICON_COLOR = {
    up: 'success',
    down: 'attention',
    dollar: 'shape',
}

export const HightLightsCardContainer = styled.View<Props>`
    background-color: ${({ theme, type }) => theme.colors[BACKGROUND[type]]};
    width: ${RFValue(300)}px;
    padding: 18px 24px;
    border-radius: 8px;
    margin-right: 16px;
`

export const CardTitleContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${RFValue(24)}px;
`
export const Title = styled.Text<Props>`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.medium};

    ${({ theme, type}) => type && css `
        color: ${['up', 'down'].includes(type) ? theme.colors.text_dark : theme.colors.shape}
    `}
`
export const Icon = styled(Feather)<Props>`
    color: ${({ type, theme }) => theme.colors[ICON_COLOR[type]]};
    font-size: ${RFValue(40)}px;
`

export const AmmountContent = styled.View`
`
export const Ammount = styled.Text<Props>`
    font-size: ${RFValue(24)}px;
    ${({ theme, type}) => type && css `
        color: ${['up', 'down'].includes(type) ? theme.colors.text_dark : theme.colors.shape}
    `}
    font-family: ${({theme}) => theme.fonts.medium};
`
export const LastTransaction = styled.Text<Props>`
    font-size: ${RFValue(12)}px;
    ${({ theme, type}) => type && css `
        color: ${['up', 'down'].includes(type) ? theme.colors.text : theme.colors.shape}
    `}
    font-family: ${({theme}) => theme.fonts.regular};
`