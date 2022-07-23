import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const InputFormContainer = styled.View`
    width: 100%;
`
export const ErrorMessage = styled.Text`
    color: ${({ theme }) => theme.colors.attention};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    margin-bottom: 12px;
`