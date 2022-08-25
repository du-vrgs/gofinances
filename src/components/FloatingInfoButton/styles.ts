import Animated from 'react-native-reanimated';
import styled from "styled-components/native";
import { PropsWithChildren } from "react";
import { BorderlessButton, BorderlessButtonProps } from "react-native-gesture-handler";
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface FloatingButtonProps extends PropsWithChildren<BorderlessButtonProps> {}

export const AnimatedFloating = styled(Animated.View)`
    position: absolute;
    bottom: 45px;
    right: 12px;

    width: 45px;
    height: 45px;
    border-radius: 22.5px;
    background-color: ${({ theme }) => theme.colors.secondary_light};

    justify-content: center;
    align-items: center;
`;

export const FloatingButtonContainer = styled(BorderlessButton)<FloatingButtonProps>`
`;

export const InfoIcon = styled(Feather)`
    font-size: ${RFValue(36)}px;
    color: ${({ theme }) => theme.colors.secondary};
`;