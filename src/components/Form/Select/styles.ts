import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled from "styled-components/native";

export const SelectContainer = styled(BorderlessButton)`
    background-color: ${({theme}) => theme.colors.shape};
    width: 100%;
    border-radius: 4px;
    padding: 16px 18px;
    flex-direction: row;
    justify-content: space-between;
`

export const Category = styled.Text`
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`

export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(20)}px;
`