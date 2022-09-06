import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props {
    isFocused?: boolean;
}
interface IconProps {
    side: 'right' | 'left';
}

export const PasswordInputContainer = styled.View<Props>`
    background-color: ${({ theme }) => theme.colors.shape};
    height: ${RFValue(56)}px;
    width: ${RFValue(300)}px;

    flex-direction: row;
    margin-bottom: 16px;
    border-radius: 5px;
    align-items: center;

    ${({ isFocused, theme }) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.primary};
    `}
`;

export const Icon = styled(Feather)<Props>`
    font-size: 24px;
    color: ${({ isFocused, theme }) => theme.colors[isFocused ? 'primary' : 'text']};
`;

export const IconContent = styled.View<IconProps>`
    width: ${RFValue(56)}px;
    height: 100%;
    align-items: center;
    justify-content: center;

    ${({ side }) => side === 'left' && css`
        border-right-width: 2px;
        border-right-color: ${({ theme }) => theme.colors.background};
    `}

    ${({ side }) => side === 'right' && css`
        border-left-width: 2px;
        border-left-color: ${({ theme }) => theme.colors.background};
    `}
`

export const Input = styled.TextInput`
    flex: 1;
    height: 100%;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 0px 12px;

    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.text};
`;