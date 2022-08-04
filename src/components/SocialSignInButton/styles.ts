import styled from "styled-components/native";
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { PropsWithChildren } from "react";
import { RFValue } from "react-native-responsive-fontsize";

interface ButtonProps extends PropsWithChildren<RectButtonProps> {};

export const SocialSignInButtonContainer = styled(RectButton)<ButtonProps>`
    background-color: ${({ theme }) => theme.colors.shape};
    height: ${RFValue(56)}px;
    width: ${RFValue(300)}px;

    flex-direction: row;
    margin-bottom: 16px;
    border-radius: 5px;
    align-items: center;
`;

export const SvgContent = styled.View`
    width: ${RFValue(56)}px;
    height: 100%;
    border-right-width: 2px;
    border-right-color: ${({ theme }) => theme.colors.background};

    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text_dark};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    margin: 0 auto;
`;