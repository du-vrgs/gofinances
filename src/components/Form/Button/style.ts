import { Feather } from '@expo/vector-icons';
import { PropsWithChildren } from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from "styled-components/native";

interface Props extends PropsWithChildren<RectButtonProps> {
    bgColor?: string;
    hasLoad?: boolean;
}

export const ButtonContainer = styled(RectButton)<Props>`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${({bgColor, theme}) => bgColor || theme.colors.secondary};

    padding: 18px;
    border-radius: 4px;
    align-items: center;

    ${({ enabled }) => enabled && css`
        background-color: ${({theme}) => theme.colors.secondary_light};
    `}
`

export const Title = styled.Text<Props>`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    color: ${({theme}) => theme.colors.shape};
    margin-right: ${({ hasLoad }) => hasLoad ? '9px' : '0px'};
`
export const LoadingSpinner = styled(Feather)`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.shape};
`;