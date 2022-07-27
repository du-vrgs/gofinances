import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled from "styled-components/native";

export type CardType = {
    type: 'Income' | 'Outcome';
 }

export const TransactionCardContainer = styled.View`
    padding: 18px 24px;
    border-radius: 8px;
    margin-bottom: 16px;

    width: 100%;
    height: ${RFValue(128)}px;

    background-color: ${({theme}) => theme.colors.shape};
`

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text};
`
export const Ammount = styled.Text<CardType>`
    font-size: ${RFValue(20)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    margin-bottom: 18px;

    color: ${({theme, type}) => theme.colors[type === 'Income' ? 'success' : 'attention']};
`
export const Footer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`
export const Icon = styled(Feather)`
    margin-right: 18px;
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
`
export const CategoryName = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text};
`
export const Date = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text};
`

