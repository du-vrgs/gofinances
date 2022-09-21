import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const DefaultAvatarContainer = styled.View`
    position: relative;
    width: ${RFValue(27)}px;
    min-width: ${RFValue(27)}px;
    height: ${RFValue(27)}px;
`;

export const AvatarHead = styled.View`
    position: absolute;
    z-index: 3;
    top: -3px;
    right: 2px;
    width: ${RFValue(20)}px;
    min-width: ${RFValue(20)}px;
    height: ${RFValue(20)}px;

    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 36px;
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const AvatarBody = styled.View`
    position: absolute;
    bottom: -13px;
    left: 3px;
    width: ${RFValue(24)}px;
    min-width: ${RFValue(24)}px;
    height: ${RFValue(24)}px;
    border-radius: 24px;
    background-color: ${({ theme }) => theme.colors.secondary};
`;
export const BodyCut = styled.View`
    position: absolute;
    bottom: -15px;
    width: 100%;
    height: 15px;
    background-color: ${({ theme }) => theme.colors.primary};
`;