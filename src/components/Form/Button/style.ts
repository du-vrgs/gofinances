import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export const ButtonContainer = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};

    padding: 18px;
    border-radius: 4px;
    align-items: center;

    ${({ disabled }) => disabled && css`
        background-color: ${({theme}) => theme.colors.secondary_light};
    `}
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    color: ${({theme}) => theme.colors.shape};
`