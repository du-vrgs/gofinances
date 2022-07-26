import { PropsWithChildren } from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from "styled-components/native";

interface Props extends PropsWithChildren<RectButtonProps> {
    
}

export const ButtonContainer = styled(RectButton)<Props>`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};

    padding: 18px;
    border-radius: 4px;
    align-items: center;

    ${({ enabled }) => enabled && css`
        background-color: ${({theme}) => theme.colors.secondary_light};
    `}
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    color: ${({theme}) => theme.colors.shape};
`