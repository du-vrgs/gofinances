import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from "styled-components/native";


interface Props {
    isActive?: boolean;
    type?: 'up' | 'down'
}

export const TransactionTypeButtonContainer = styled(TouchableOpacity)<Props>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1.5px solid ${({theme}) => theme.colors.text};
    border-radius: 4px;

    padding: 16px;

    ${({theme, isActive, type}) => isActive && css`
        border: 0px;
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